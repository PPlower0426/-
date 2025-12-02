// 합격의 탑 모바일 게임 - 최적화 버전
// 게임 상태
const mobileGameState = {
    heroHP: 100,
    heroMaxHP: 100,
    monsterHP: 100,
    monsterMaxHP: 100,
    currentFloor: 1,
    combo: 0,
    maxCombo: 0,
    potions: 3,
    isBattleActive: false,
    isProcessing: false,
    timer: 10.0,
    timerInterval: null,
    currentQuestion: null,
    currentMonster: 0
};

// 전역 변수
let mobileMonsters = [];
let monsterDialogsByFloor = [];
let gameDataLoaded = false;
let gameInitialized = false;
let eventListenersSetup = false;
let gameStartInProgress = false;
let nextFloorInProgress = false;
let retryInProgress = false;
let questionCache = [];

// 기본 몬스터 데이터 (최소한의 데이터)
const defaultMonsters = [
    { emoji: '👹', name: '진입 문지기', level: 'Lv.1', baseHP: 100 },
    { emoji: '👿', name: '독서실 빌런', level: 'Lv.2', baseHP: 120 }
];

// 기본 대사
const defaultDialogs = {
    'welcome': '합격의 탑에 오신 것을 환영합니다!',
    'battle_start': '문제를 풀어보세요!',
    'correct': '정답입니다!',
    'incorrect': '틀렸습니다!',
    'timeout': '시간 초과!',
    'victory': '승리했습니다!',
    'defeat': '패배했습니다!',
    'combo': '콤보!',
    'potion': '포션을 사용했습니다!'
};

// 게임 데이터 로드 함수
function loadGameData() {
    return new Promise((resolve, reject) => {
        // 이미 로드되었으면 바로 반환
        if (gameDataLoaded) {
            resolve();
            return;
        }
        
        console.log('게임 데이터 로드 시작...');
        
        // 로딩 표시
        if (document.getElementById('speech-text')) {
            document.getElementById('speech-text').textContent = '게임 데이터 로드 중...';
        }
        
        fetch('game-data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('게임 데이터 로드 실패');
                }
                return response.json();
            })
            .then(data => {
                console.log('게임 데이터 로드 완료');
                
                // monsters 데이터 설정
                if (data.monsters && Array.isArray(data.monsters) && data.monsters.length > 0) {
                    mobileMonsters = data.monsters;
                } else {
                    mobileMonsters = defaultMonsters;
                }
                
                // dialogs 데이터 설정
                if (data.dialogs && Array.isArray(data.dialogs) && data.dialogs.length > 0) {
                    monsterDialogsByFloor = data.dialogs;
                }
                
                gameDataLoaded = true;
                resolve();
            })
            .catch(error => {
                console.warn('게임 데이터 로드 실패, 기본 데이터 사용:', error);
                // 실패 시 기본 데이터 사용
                mobileMonsters = defaultMonsters;
                monsterDialogsByFloor = [];
                gameDataLoaded = true;
                resolve();
            });
    });
}

// 문제 미리 로드 함수
function preloadQuestions() {
    console.log('문제 미리 로드 시작');
    
    questionCache = [];
    
    // questions.js에서 문제 캐싱
    if (typeof questionsData !== 'undefined') {
        const categories = Object.keys(questionsData);
        
        categories.forEach(category => {
            const questions = questionsData[category];
            if (questions && questions.length > 0) {
                questions.forEach(q => {
                    questionCache.push({
                        category: category,
                        question: q.question,
                        answer: q.answer
                    });
                });
            }
        });
        
        console.log(`문제 ${questionCache.length}개 미리 로드 완료`);
    } else {
        // 기본 문제 생성
        questionCache = [
            { category: '민법', question: "민법상 20세 미만의 미성년자는 법정대리인의 동의 없이 계약을 체결할 수 없다. (정답: O)", answer: "O" },
            { category: '민법', question: "특허권의 존속기간은 출원일로부터 20년이다. (정답: O)", answer: "O" },
            { category: '민법', question: "상표권은 등록 없이도 사용만으로 권리가 발생한다. (정답: X)", answer: "X" },
            { category: '민법', question: "실용신안권의 존속기간은 출원일로부터 10년이다. (정답: O)", answer: "O" },
            { category: '민법', question: "디자인권은 등록 후 15년간 보호된다. (정답: O)", answer: "O" }
        ];
        console.log('기본 문제 5개 생성 완료');
    }
    
    return questionCache.length > 0;
}

// 몬스터 대사 선택 함수
function getMonsterDialog(type) {
    // 현재 층수 확인
    const floorIndex = mobileGameState.currentFloor - 1;
    
    // 게임 데이터가 로드되었고, 해당 층의 대사가 있으면 사용
    if (gameDataLoaded && monsterDialogsByFloor.length > 0) {
        const floorDialogs = monsterDialogsByFloor.find(dialog => dialog.floor === mobileGameState.currentFloor);
        
        if (floorDialogs && floorDialogs[type]) {
            const dialogs = floorDialogs[type];
            if (Array.isArray(dialogs) && dialogs.length > 0) {
                return dialogs[Math.floor(Math.random() * dialogs.length)];
            } else if (typeof dialogs === 'string') {
                return dialogs;
            }
        }
    }
    
    // 기본 대사 반환
    return getDefaultDialog(type);
}

// 기본 대사
function getDefaultDialog(type) {
    return defaultDialogs[type] || '...';
}

// 게임 초기화
function initMobileGame() {
    if (gameInitialized) {
        console.log('게임 이미 초기화됨');
        return;
    }
    
    console.log('합격의 탑 모바일 게임 초기화');
    gameInitialized = true;
    
    // UI 업데이트
    updateMobileUI();
    
    // 이벤트 리스너 설정
    setupMobileEventListeners();
    
    // 시작 화면 표시
    document.getElementById('start-screen').style.display = 'flex';
    
    // 게임 데이터 로드 시작 (백그라운드에서)
    loadGameData();
}

// 이벤트 리스너 설정
function setupMobileEventListeners() {
    if (eventListenersSetup) {
        console.log('이벤트 리스너 이미 설정됨');
        return;
    }
    
    console.log('이벤트 리스너 설정 시작');
    
    // 시작 버튼
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', function() {
            console.log('시작 버튼 클릭됨');
            
            // 즉시 진동 효과
            if (navigator.vibrate) navigator.vibrate(30);
            
            // 시각적 피드백
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 200);
            
            // 게임 시작
            setTimeout(() => startMobileGame(), 50);
        });
        setupTouchEvents(startButton);
    }
    
    // OX 버튼
    const trueBtn = document.getElementById('true-btn');
    const falseBtn = document.getElementById('false-btn');
    
    // O 버튼 클릭 핸들러
    function handleOClick() {
        if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) {
            console.log('답변 처리 불가: 처리 중이거나 배틀 비활성');
            return;
        }
        
        console.log('O 버튼 클릭됨');
        
        // 즉시 진동 효과
        if (navigator.vibrate) navigator.vibrate(30);
        trueBtn.classList.add('vibrate');
        setTimeout(() => trueBtn.classList.remove('vibrate'), 200);
        
        // 답변 처리
        setTimeout(() => handleMobileAnswer('O'), 10);
    }
    
    // X 버튼 클릭 핸들러
    function handleXClick() {
        if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) {
            console.log('답변 처리 불가: 처리 중이거나 배틀 비활성');
            return;
        }
        
        console.log('X 버튼 클릭됨');
        
        // 즉시 진동 효과
        if (navigator.vibrate) navigator.vibrate(30);
        falseBtn.classList.add('vibrate');
        setTimeout(() => falseBtn.classList.remove('vibrate'), 200);
        
        // 답변 처리
        setTimeout(() => handleMobileAnswer('X'), 10);
    }
    
    if (trueBtn) {
        trueBtn.addEventListener('click', handleOClick);
        setupTouchEvents(trueBtn);
    }
    
    if (falseBtn) {
        falseBtn.addEventListener('click', handleXClick);
        setupTouchEvents(falseBtn);
    }
    
    // 포션 버튼
    const potionBtn = document.querySelector('.potion-display');
    if (potionBtn) {
        potionBtn.addEventListener('click', function() {
            if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) {
                console.log('포션 사용 불가: 처리 중이거나 배틀 비활성');
                return;
            }
            
            // 즉시 진동 효과
            if (navigator.vibrate) navigator.vibrate(50);
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 200);
            
            // 포션 사용
            setTimeout(() => usePotion(), 10);
        });
        setupTouchEvents(potionBtn);
    }
    
    // 결과 화면 버튼
    const nextBtn = document.getElementById('next-button');
    const retryBtn = document.getElementById('retry-button');
    
    // 다음 층 버튼 핸들러
    function handleNextClick() {
        console.log('다음 층 버튼 클릭됨');
        
        // 즉시 진동 효과
        if (navigator.vibrate) navigator.vibrate(50);
        nextBtn.classList.add('vibrate');
        setTimeout(() => nextBtn.classList.remove('vibrate'), 200);
        
        // 다음 층 이동
        setTimeout(() => nextMobileFloor(), 50);
    }
    
    // 다시 시작 버튼 핸들러
    function handleRetryClick() {
        console.log('다시 시작 버튼 클릭됨');
        
        // 즉시 진동 효과
        if (navigator.vibrate) navigator.vibrate(50);
        retryBtn.classList.add('vibrate');
        setTimeout(() => retryBtn.classList.remove('vibrate'), 200);
        
        // 다시 시작
        setTimeout(() => retryMobileGame(), 50);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', handleNextClick);
        setupTouchEvents(nextBtn);
    }
    
    if (retryBtn) {
        retryBtn.addEventListener('click', handleRetryClick);
        setupTouchEvents(retryBtn);
    }
    
    eventListenersSetup = true;
    console.log('이벤트 리스너 설정 완료');
}

// 터치 이벤트 설정
function setupTouchEvents(element) {
    if (!element) return;
    
    element.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.95)';
        // 진동 호출 제거 (사용자 상호작용 전에는 차단됨)
        // if (navigator.vibrate) {
        //     navigator.vibrate(30);
        // }
        if (e.cancelable) e.preventDefault();
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
}

// 게임 시작
function startMobileGame() {
    if (gameStartInProgress) {
        console.log('게임 시작 진행 중...');
        return;
    }
    
    if (mobileGameState.isBattleActive) {
        console.log('게임이 이미 진행 중입니다.');
        return;
    }
    
    gameStartInProgress = true;
    console.log('게임 시작');
    
    // 시작 화면 숨기기
    document.getElementById('start-screen').style.display = 'none';
    
    // 게임 상태 초기화
    mobileGameState.heroHP = 100;
    mobileGameState.heroMaxHP = 100;
    mobileGameState.monsterHP = 100;
    mobileGameState.monsterMaxHP = 100;
    mobileGameState.currentFloor = 1;
    mobileGameState.combo = 0;
    mobileGameState.maxCombo = 0;
    mobileGameState.potions = 3;
    mobileGameState.isBattleActive = true;
    mobileGameState.isProcessing = false;
    mobileGameState.timer = 10.0;
    
    // 기존 타이머 정리
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    // 문제 미리 로드
    preloadQuestions();
    
    // 시작 애니메이션
    const gameContainer = document.querySelector('.game-container');
    gameContainer.classList.add('screen-shake');
    setTimeout(() => {
        gameContainer.classList.remove('screen-shake');
    }, 300);
    
    // 몬스터 초기화
    updateMobileMonster();
    
    // 첫 문제 생성
    setTimeout(() => {
        generateMobileQuestion();
        gameStartInProgress = false;
    }, 500);
    
    // 말풍선 메시지
    updateMonsterSpeech('welcome');
}

// 몬스터 업데이트
function updateMobileMonster() {
    let monster;
    
    // 게임 데이터가 로드되었는지 확인
    if (gameDataLoaded && mobileMonsters.length > 0) {
        const monsterIndex = Math.min(mobileGameState.currentFloor - 1, mobileMonsters.length - 1);
        monster = mobileMonsters[monsterIndex];
        mobileGameState.currentMonster = monsterIndex;
    } else {
        // 기본 몬스터 사용
        const monsterIndex = Math.min(mobileGameState.currentFloor - 1, defaultMonsters.length - 1);
        monster = defaultMonsters[monsterIndex];
        mobileGameState.currentMonster = monsterIndex;
    }
    
    // 몬스터 체력 설정
    mobileGameState.monsterMaxHP = monster.baseHP;
    mobileGameState.monsterHP = mobileGameState.monsterMaxHP;
    
    // 몬스터 등장 애니메이션
    const monsterCircle = document.querySelector('.monster-circle');
    monsterCircle.style.animation = 'monsterPulse 1.5s infinite alternate, floatUpDown 2s infinite ease-in-out';
    
    // UI 업데이트
    document.getElementById('monster-emoji').textContent = monster.emoji;
    document.getElementById('monster-name').textContent = monster.name;
    document.getElementById('monster-level').textContent = monster.level;
    document.getElementById('floor-number').textContent = mobileGameState.currentFloor;
    
    updateMobileUI();
}

// 문제 생성
function generateMobileQuestion() {
    if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) {
        console.log('문제 생성 불가: 처리 중이거나 배틀 비활성');
        return;
    }
    
    mobileGameState.isProcessing = true;
    
    // 타이머 정리
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    let questionData;
    
    // 캐시된 문제에서 선택
    if (questionCache.length > 0) {
        const randomIndex = Math.floor(Math.random() * questionCache.length);
        questionData = questionCache[randomIndex];
    } else {
        // 캐시가 없으면 즉시 기본 문제 생성
        questionData = {
            category: '민법',
            question: "민법상 20세 미만의 미성년자는 법정대리인의 동의 없이 계약을 체결할 수 없다. (정답: O)",
            answer: "O"
        };
    }
    
    mobileGameState.currentQuestion = questionData;
    mobileGameState.timer = 10.0;
    
    // 문제 등장 애니메이션
    const questionBox = document.querySelector('.question-box');
    questionBox.classList.add('vibrate');
    setTimeout(() => {
        questionBox.classList.remove('vibrate');
    }, 200);
    
    // UI 업데이트
    document.getElementById('question-text').textContent = questionData.question;
    document.getElementById('question-type').textContent = questionData.category + ' 문제';
    document.getElementById('question-category').textContent = questionData.category;
    
    updateTimerDisplay();
    
    // 몬스터 대사
    updateMonsterSpeech('battle_start');
    
    // 타이머 시작
    let timerCounter = 100;
    
    mobileGameState.timerInterval = setInterval(() => {
        timerCounter--;
        mobileGameState.timer = timerCounter / 10;
        
        if (timerCounter <= 30 && timerCounter > 29) {
            // 시간이 얼마 남지 않았을 때 효과
            const timerCircle = document.querySelector('.timer-circle');
            if (timerCircle) timerCircle.classList.add('vibrate');
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        }
        
        if (timerCounter <= 0) {
            clearInterval(mobileGameState.timerInterval);
            mobileGameState.timerInterval = null;
            handleMobileTimeOut();
        } else {
            updateTimerDisplay();
        }
    }, 100);
    
    mobileGameState.isProcessing = false;
    console.log('새 문제 생성 완료');
}

// 타이머 표시 업데이트
function updateTimerDisplay() {
    const timerText = document.getElementById('timer-text');
    const timerCircle = document.querySelector('.timer-circle');
    
    if (!timerText || !timerCircle) return;
    
    timerText.textContent = mobileGameState.timer.toFixed(1);
    
    const percent = mobileGameState.timer / 10.0;
    
    if (percent < 0.3) {
        timerCircle.style.background = 'linear-gradient(135deg, #ff4444 0%, #c44569 100%)';
        timerCircle.style.borderColor = '#ff4444';
        timerCircle.style.boxShadow = '0 0 25px rgba(255, 68, 68, 0.9)';
        timerText.style.color = '#ffd700';
        timerCircle.classList.add('vibrate');
    } else if (percent < 0.6) {
        timerCircle.style.background = 'linear-gradient(135deg, #ff9a76 0%, #ff6b6b 100%)';
        timerCircle.style.borderColor = '#ff9a76';
        timerCircle.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.7)';
        timerText.style.color = 'white';
        timerCircle.classList.remove('vibrate');
    } else {
        timerCircle.style.background = 'linear-gradient(135deg, #2c7873 0%, #4ecdc4 100%)';
        timerCircle.style.borderColor = '#44a08d';
        timerCircle.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.7)';
        timerText.style.color = 'white';
        timerCircle.classList.remove('vibrate');
    }
}

// 포션 사용 함수
function usePotion() {
    if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) return;
    if (mobileGameState.potions <= 0) {
        updateMonsterSpeech('potion', "포션이 없어!");
        return;
    }
    if (mobileGameState.heroHP >= mobileGameState.heroMaxHP) {
        updateMonsterSpeech('potion', "체력이 가득 찼어!");
        return;
    }
    
    mobileGameState.isProcessing = true;
    
    // 포션 사용
    mobileGameState.potions--;
    
    // 체력 회복
    const healAmount = Math.min(30, mobileGameState.heroMaxHP - mobileGameState.heroHP);
    mobileGameState.heroHP += healAmount;
    
    // 효과음 재생
    playSound('potion-sound');
    
    // 진동 효과
    if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50]);
    }
    
    // 힐 효과 애니메이션
    const healEffect = document.createElement('div');
    healEffect.className = 'heal-effect';
    document.body.appendChild(healEffect);
    
    setTimeout(() => {
        healEffect.remove();
    }, 500);
    
    // 힐 데미지 표시
    showDamageEffect(healAmount, 'hero', 'heal');
    
    // 포션 애니메이션
    const potionDisplay = document.querySelector('.potion-display');
    if (potionDisplay) {
        potionDisplay.classList.add('explode');
        setTimeout(() => {
            potionDisplay.classList.remove('explode');
        }, 500);
    }
    
    // 대사
    updateMonsterSpeech('potion');
    
    // UI 업데이트
    updateMobileUI();
    
    setTimeout(() => {
        mobileGameState.isProcessing = false;
    }, 1000);
}

// 말풍선 업데이트
function updateMonsterSpeech(type, customText = null) {
    const speechElement = document.getElementById('speech-text');
    if (!speechElement) return;
    
    let text;
    
    if (customText) {
        text = customText;
    } else {
        text = getMonsterDialog(type);
    }
    
    speechElement.style.opacity = '0';
    
    setTimeout(() => {
        speechElement.textContent = text;
        speechElement.style.opacity = '1';
        speechElement.classList.add('vibrate');
        setTimeout(() => {
            speechElement.classList.remove('vibrate');
        }, 200);
    }, 150);
}

// 답변 처리
function handleMobileAnswer(answer) {
    if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) {
        console.log('답변 처리 불가: 처리 중이거나 배틀 비활성');
        return;
    }
    
    mobileGameState.isProcessing = true;
    
    // 타이머 정리
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    const isCorrect = (answer === mobileGameState.currentQuestion.answer);
    
    // 버튼 클릭 애니메이션
    const clickedBtn = answer === 'O' ? document.getElementById('true-btn') : document.getElementById('false-btn');
    if (clickedBtn) {
        clickedBtn.classList.add('explode');
        setTimeout(() => {
            clickedBtn.classList.remove('explode');
        }, 300);
    }
    
    // 진동 효과
    if (navigator.vibrate) {
        navigator.vibrate(isCorrect ? [100, 50, 100] : [200, 100, 200]);
    }
    
    if (isCorrect) {
        // 정답 처리
        mobileGameState.combo++;
        mobileGameState.maxCombo = Math.max(mobileGameState.maxCombo, mobileGameState.combo);
        
        const damage = Math.floor(20 + mobileGameState.combo * 3);
        mobileGameState.monsterHP -= damage;
        
        // 정답 효과음
        playSound('correct-sound');
        
        // 콤보 효과
        if (mobileGameState.combo >= 3) {
            showComboEffect();
            updateMonsterSpeech('combo');
            
            // 콤보 진동
            if (navigator.vibrate) {
                navigator.vibrate([50, 30, 50, 30, 50]);
            }
        } else {
            updateMonsterSpeech('correct');
        }
        
        // 몬스터 데미지 애니메이션
        const monsterCircle = document.querySelector('.monster-circle');
        if (monsterCircle) {
            monsterCircle.classList.add('screen-shake');
            setTimeout(() => {
                monsterCircle.classList.remove('screen-shake');
            }, 500);
        }
        
        // 데미지 표시
        showDamageEffect(damage, 'monster');
        
        // 몬스터 처치 체크
        if (mobileGameState.monsterHP <= 0) {
            mobileGameState.monsterHP = 0;
            monsterDefeated();
            return;
        }
    } else {
        // 오답 처리
        mobileGameState.combo = 0;
        
        const damage = Math.floor(15 + (mobileGameState.currentFloor - 1) * 2);
        mobileGameState.heroHP -= damage;
        
        // 오답 효과음
        playSound('wrong-sound');
        
        // 히트 효과
        showDamageEffect(damage, 'hero');
        
        // 화면 흔들림
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            gameContainer.classList.add('screen-shake');
            setTimeout(() => {
                gameContainer.classList.remove('screen-shake');
            }, 500);
        }
        
        updateMonsterSpeech('incorrect');
        
        // 게임 오버 체크
        if (mobileGameState.heroHP <= 0) {
            mobileGameState.heroHP = 0;
            gameOver();
            return;
        }
    }
    
    // UI 업데이트
    updateMobileUI();
    
    // 다음 문제
    setTimeout(() => {
        mobileGameState.isProcessing = false;
        generateMobileQuestion();
    }, 1500);
}

// 시간 초과 처리
function handleMobileTimeOut() {
    if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) return;
    
    mobileGameState.isProcessing = true;
    
    mobileGameState.combo = 0;
    const damage = Math.floor(10 + (mobileGameState.currentFloor - 1) * 1.5);
    mobileGameState.heroHP -= damage;
    
    // 시간 초과 효과음
    playSound('wrong-sound');
    
    // 강한 진동
    if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300]);
    }
    
    // 화면 흔들림
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.classList.add('screen-shake');
        setTimeout(() => {
            gameContainer.classList.remove('screen-shake');
        }, 700);
    }
    
    updateMonsterSpeech('timeout');
    showDamageEffect(damage, 'hero', 'timeout');
    
    if (mobileGameState.heroHP <= 0) {
        mobileGameState.heroHP = 0;
        gameOver();
        return;
    }
    
    updateMobileUI();
    
    setTimeout(() => {
        mobileGameState.isProcessing = false;
        generateMobileQuestion();
    }, 1500);
}

// 몬스터 처치
function monsterDefeated() {
    mobileGameState.isBattleActive = false;
    
    // 승리 효과음
    playSound('correct-sound');
    
    // 강한 진동
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
    }
    
    // 몬스터 폭발 애니메이션
    const monsterCircle = document.querySelector('.monster-circle');
    if (monsterCircle) {
        monsterCircle.classList.add('explode');
    }
    
    updateMonsterSpeech('victory');
    
    setTimeout(() => {
        showResultScreen('victory');
    }, 1500);
}

// 게임 오버
function gameOver() {
    mobileGameState.isBattleActive = false;
    
    // 패배 효과음
    playSound('wrong-sound');
    
    // 강한 진동
    if (navigator.vibrate) {
        navigator.vibrate([500, 200, 500]);
    }
    
    // 화면 붉은 효과
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.classList.add('screen-shake');
        setTimeout(() => {
            gameContainer.classList.remove('screen-shake');
        }, 1000);
    }
    
    updateMonsterSpeech('defeat');
    
    setTimeout(() => {
        showResultScreen('defeat');
    }, 1500);
}

// 결과 화면 표시
function showResultScreen(type) {
    const resultScreen = document.getElementById('result-screen');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultDetails = document.getElementById('result-details');
    const nextBtn = document.getElementById('next-button');
    const retryBtn = document.getElementById('retry-button');
    
    // 결과 데이터 설정
    document.getElementById('result-floor').textContent = mobileGameState.currentFloor + '층';
    document.getElementById('result-combo').textContent = mobileGameState.maxCombo + '회';
    document.getElementById('result-hp').textContent = mobileGameState.heroHP;
    document.getElementById('result-potions').textContent = mobileGameState.potions + '개';
    
    // 결과 화면 애니메이션
    if (resultScreen) {
        resultScreen.classList.add('screen-shake');
        setTimeout(() => {
            resultScreen.classList.remove('screen-shake');
        }, 500);
    }
    
    if (type === 'victory') {
        if (resultIcon) resultIcon.textContent = '🏆';
        if (resultTitle) resultTitle.textContent = '승리!';
        if (resultDetails) resultDetails.textContent = getMonsterName() + '을(를) 물리쳤습니다!';
        if (nextBtn) nextBtn.style.display = 'flex';
        if (retryBtn) retryBtn.style.display = 'none';
        
        // 승리 효과음
        playSound('correct-sound');
    } else {
        if (resultIcon) resultIcon.textContent = '💀';
        if (resultTitle) resultTitle.textContent = '패배!';
        if (resultDetails) resultDetails.textContent = mobileGameState.currentFloor + '층에서 실패했습니다.';
        if (nextBtn) nextBtn.style.display = 'none';
        if (retryBtn) retryBtn.style.display = 'flex';
    }
    
    if (resultScreen) {
        resultScreen.style.display = 'flex';
    }
}

// 몬스터 이름 가져오기
function getMonsterName() {
    if (gameDataLoaded && mobileMonsters.length > 0) {
        const monsterIndex = Math.min(mobileGameState.currentMonster, mobileMonsters.length - 1);
        return mobileMonsters[monsterIndex].name;
    } else {
        const monsterIndex = Math.min(mobileGameState.currentMonster, defaultMonsters.length - 1);
        return defaultMonsters[monsterIndex].name;
    }
}

// 다음 층으로 이동
function nextMobileFloor() {
    if (nextFloorInProgress) {
        console.log('다음 층 이동 진행 중...');
        return;
    }
    
    nextFloorInProgress = true;
    console.log('다음 층으로 이동');
    
    // 기존 타이머 정리
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    mobileGameState.currentFloor++;
    mobileGameState.combo = 0;
    mobileGameState.isBattleActive = true;
    mobileGameState.isProcessing = false;
    
    // 3층마다 포션 보상
    if (mobileGameState.currentFloor % 3 === 0) {
        mobileGameState.potions++;
        updateMonsterSpeech('potion', `포션을 획득했다! (현재 ${mobileGameState.potions}개)`);
    }
    
    // 체력 일부 회복 (최대 50%)
    const healAmount = Math.min(mobileGameState.heroMaxHP * 0.5, mobileGameState.heroMaxHP - mobileGameState.heroHP);
    mobileGameState.heroHP += healAmount;
    
    // 층수 증가 애니메이션
    const floorNumber = document.getElementById('floor-number');
    if (floorNumber) {
        floorNumber.classList.add('explode');
        setTimeout(() => {
            floorNumber.classList.remove('explode');
        }, 300);
    }
    
    // 결과 화면 숨기기
    const resultScreen = document.getElementById('result-screen');
    if (resultScreen) {
        resultScreen.style.display = 'none';
    }
    
    // 몬스터 업데이트
    setTimeout(() => {
        updateMobileMonster();
        
        // 대사 업데이트
        updateMonsterSpeech('welcome');
        
        // 다음 문제 생성
        setTimeout(() => {
            generateMobileQuestion();
            nextFloorInProgress = false;
        }, 1000);
    }, 300);
}

// 다시 시작
function retryMobileGame() {
    if (retryInProgress) {
        console.log('다시 시작 진행 중...');
        return;
    }
    
    retryInProgress = true;
    console.log('게임 다시 시작');
    
    // 기존 타이머 정리
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    // 게임 상태 초기화
    mobileGameState.heroHP = 100;
    mobileGameState.heroMaxHP = 100;
    mobileGameState.monsterHP = 100;
    mobileGameState.monsterMaxHP = 100;
    mobileGameState.currentFloor = 1;
    mobileGameState.combo = 0;
    mobileGameState.maxCombo = 0;
    mobileGameState.potions = 3;
    mobileGameState.isBattleActive = true;
    mobileGameState.isProcessing = false;
    mobileGameState.timer = 10.0;
    
    // 결과 화면 숨기기
    const resultScreen = document.getElementById('result-screen');
    if (resultScreen) {
        resultScreen.style.display = 'none';
    }
    
    // 재시작 애니메이션
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.classList.add('screen-shake');
        setTimeout(() => {
            gameContainer.classList.remove('screen-shake');
        }, 500);
    }
    
    // 몬스터 초기화
    setTimeout(() => {
        updateMobileMonster();
        
        // 대사 업데이트
        updateMonsterSpeech('welcome');
        
        // 문제 생성
        setTimeout(() => {
            generateMobileQuestion();
            retryInProgress = false;
            gameStartInProgress = false;
        }, 1000);
    }, 300);
}

// UI 업데이트
function updateMobileUI() {
    // HP 퍼센트 계산
    const heroHpPercent = (mobileGameState.heroHP / mobileGameState.heroMaxHP) * 100;
    const monsterHpPercent = (mobileGameState.monsterHP / mobileGameState.monsterMaxHP) * 100;
    
    // HP 바 업데이트
    const heroHpFill = document.getElementById('hero-hp-fill');
    const monsterHpFill = document.getElementById('monster-hp-fill');
    
    if (heroHpFill) {
        heroHpFill.style.width = `${heroHpPercent}%`;
        // 체력이 낮을 때 애니메이션
        if (heroHpPercent < 30) {
            heroHpFill.classList.add('vibrate');
        } else {
            heroHpFill.classList.remove('vibrate');
        }
    }
    
    if (monsterHpFill) {
        monsterHpFill.style.width = `${monsterHpPercent}%`;
    }
    
    // HP 텍스트 업데이트
    const heroHpText = document.getElementById('hero-hp-text');
    const monsterHpText = document.getElementById('monster-hp-text');
    
    if (heroHpText) {
        heroHpText.textContent = `${mobileGameState.heroHP}/${mobileGameState.heroMaxHP}`;
    }
    
    if (monsterHpText) {
        monsterHpText.textContent = `${Math.max(0, mobileGameState.monsterHP)}/${mobileGameState.monsterMaxHP}`;
    }
    
    // 상태 정보 업데이트
    const heroHpValue = document.getElementById('hero-hp-value');
    const comboValue = document.getElementById('combo-value');
    const potionCount = document.getElementById('potion-count');
    
    if (heroHpValue) heroHpValue.textContent = mobileGameState.heroHP;
    if (comboValue) comboValue.textContent = mobileGameState.combo;
    if (potionCount) potionCount.textContent = mobileGameState.potions;
    
    // 콤보에 따른 색상 효과
    if (comboValue) {
        if (mobileGameState.combo >= 5) {
            comboValue.style.color = '#ff4444';
            comboValue.style.textShadow = '0 0 15px rgba(255, 68, 68, 1)';
            comboValue.classList.add('vibrate');
        } else if (mobileGameState.combo >= 3) {
            comboValue.style.color = '#ffd700';
            comboValue.style.textShadow = '0 0 12px rgba(255, 215, 0, 0.8)';
            comboValue.classList.remove('vibrate');
        } else {
            comboValue.style.color = '#ffd700';
            comboValue.style.textShadow = 'none';
            comboValue.classList.remove('vibrate');
        }
    }
}

// 데미지 효과 표시
function showDamageEffect(amount, target, type = 'damage') {
    const popup = document.getElementById('damage-popup');
    if (!popup) return;
    
    if (type === 'heal') {
        popup.textContent = `+${amount}`;
        popup.style.color = '#4ecdc4';
        popup.style.textShadow = '0 0 20px rgba(78, 205, 196, 1), 0 3px 6px rgba(0, 0, 0, 0.9)';
    } else if (target === 'monster') {
        popup.textContent = `-${amount}`;
        popup.style.color = '#ffd700';
        popup.style.textShadow = '0 0 20px rgba(255, 215, 0, 1), 0 3px 6px rgba(0, 0, 0, 0.9)';
    } else {
        popup.textContent = `-${amount}`;
        popup.style.color = '#ff4444';
        popup.style.textShadow = '0 0 20px rgba(255, 68, 68, 1), 0 3px 6px rgba(0, 0, 0, 0.9)';
        
        // 히트 효과
        const hitEffect = document.getElementById('hit-effect');
        if (hitEffect) {
            hitEffect.style.animation = 'none';
            setTimeout(() => {
                hitEffect.style.animation = 'hitFlash 0.4s ease-out forwards';
            }, 10);
        }
    }
    
    popup.style.animation = 'none';
    setTimeout(() => {
        popup.style.animation = 'damagePopup 1s ease-out forwards';
    }, 10);
}

// 콤보 효과 표시
function showComboEffect() {
    const comboEffect = document.getElementById('combo-effect');
    if (!comboEffect) return;
    
    comboEffect.textContent = `${mobileGameState.combo} COMBO!`;
    comboEffect.style.animation = 'none';
    
    setTimeout(() => {
        comboEffect.style.animation = 'comboFloat 1.2s ease-out forwards';
    }, 10);
}

// 사운드 재생
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        try {
            sound.currentTime = 0;
            sound.play().catch(e => {
                // 오류 무시 (사용자가 음소거했을 수 있음)
            });
        } catch (e) {
            // 오류 무시
        }
    }
}

// 빠른 초기화 함수
function quickInitialize() {
    console.log('빠른 초기화 시작');
    
    // 1. questionsData가 없으면 기본 데이터 생성
    if (typeof questionsData === 'undefined') {
        console.log('기본 문제 데이터 생성');
        window.questionsData = {
            '민법': [
                { question: "민법상 20세 미만의 미성년자는 법정대리인의 동의 없이 계약을 체결할 수 없다. (정답: O)", answer: "O" },
                { question: "특허권의 존속기간은 출원일로부터 20년이다. (정답: O)", answer: "O" },
                { question: "상표권은 등록 없이도 사용만으로 권리가 발생한다. (정답: X)", answer: "X" },
                { question: "실용신안권의 존속기간은 출원일로부터 10년이다. (정답: O)", answer: "O" },
                { question: "디자인권은 등록 후 15년간 보호된다. (정답: O)", answer: "O" }
            ]
        };
    }
    
    // 2. 게임 데이터 비동기 로드 시작
    loadGameData();
    
    // 3. 게임 초기화
    setTimeout(() => {
        if (!gameInitialized) {
            initMobileGame();
        }
    }, 100);
}

// DOM 로드 완료 시 게임 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    
    // 빠른 초기화 실행
    quickInitialize();
});

// iOS 최적화
if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    document.addEventListener('touchmove', function(e) {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });
}