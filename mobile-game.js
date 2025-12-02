// 합격의 탑 모바일 게임 - 최종 수정 버전
// 진동 문제 해결 및 불필요한 코드 제거

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
let userHasInteracted = false; // 상호작용 감지용

// 기본 몬스터 데이터
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

// 안전한 진동 함수 (사용자 상호작용 후에만 작동)
function safeVibrate(pattern) {
    // 사용자가 아직 상호작용하지 않았다면 진동 안함
    if (!userHasInteracted) {
        return;
    }
    
    if (navigator.vibrate) {
        try {
            navigator.vibrate(pattern);
        } catch (e) {
            // 진동 실패 무시
        }
    }
}

// 사용자 상호작용 감지
function detectUserInteraction() {
    if (!userHasInteracted) {
        userHasInteracted = true;
        console.log('사용자 상호작용 감지됨 - 진동 활성화');
    }
}

// 게임 데이터 로드 함수 (XMLHttpRequest 사용)
function loadGameData() {
    return new Promise((resolve, reject) => {
        if (gameDataLoaded) {
            resolve();
            return;
        }
        
        console.log('게임 데이터 로드 시작...');
        
        // XMLHttpRequest 사용 (CORS 문제 방지)
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'game-data.json', true);
        xhr.responseType = 'json';
        
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 0) {
                const data = xhr.response;
                console.log('게임 데이터 로드 완료');
                
                if (data.monsters && Array.isArray(data.monsters)) {
                    mobileMonsters = data.monsters;
                } else {
                    mobileMonsters = defaultMonsters;
                }
                
                if (data.dialogs && Array.isArray(data.dialogs)) {
                    monsterDialogsByFloor = data.dialogs;
                }
                
                gameDataLoaded = true;
                resolve();
            } else {
                throw new Error('게임 데이터 로드 실패');
            }
        };
        
        xhr.onerror = function() {
            console.warn('게임 데이터 로드 실패, 기본 데이터 사용');
            mobileMonsters = defaultMonsters;
            monsterDialogsByFloor = [];
            gameDataLoaded = true;
            resolve();
        };
        
        xhr.send();
    });
}

// 문제 미리 로드
function preloadQuestions() {
    questionCache = [];
    
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
        questionCache = [
            { category: '민법', question: "민법상 20세 미만의 미성년자는 법정대리인의 동의 없이 계약을 체결할 수 없다. (정답: O)", answer: "O" },
            { category: '민법', question: "특허권의 존속기간은 출원일로부터 20년이다. (정답: O)", answer: "O" }
        ];
        console.log('기본 문제 2개 생성 완료');
    }
    
    return questionCache.length > 0;
}

// 몬스터 대사 선택
function getMonsterDialog(type) {
    const floorIndex = mobileGameState.currentFloor - 1;
    
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
    
    return defaultDialogs[type] || '...';
}

// 게임 초기화
function initMobileGame() {
    if (gameInitialized) return;
    
    console.log('합격의 탑 모바일 게임 초기화');
    gameInitialized = true;
    
    // UI 업데이트
    updateMobileUI();
    
    // 이벤트 리스너 설정
    setupMobileEventListeners();
    
    // 시작 화면 표시
    document.getElementById('start-screen').style.display = 'flex';
    
    // 게임 데이터 로드 시작
    loadGameData();
}

// 이벤트 리스너 설정 (진동 문제 수정)
function setupMobileEventListeners() {
    if (eventListenersSetup) return;
    
    console.log('이벤트 리스너 설정 시작');
    
    // 모든 버튼에 상호작용 감지 추가
    const allInteractiveElements = [
        '#start-button',
        '#true-btn',
        '#false-btn',
        '.potion-display',
        '#next-button',
        '#retry-button'
    ];
    
    allInteractiveElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('click', detectUserInteraction);
            element.addEventListener('touchstart', detectUserInteraction);
        }
    });
    
    // 시작 버튼
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', function() {
            console.log('시작 버튼 클릭됨');
            
            // 시각적 피드백
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 200);
            
            // 진동 (사용자 상호작용 후)
            safeVibrate(30);
            
            // 게임 시작
            setTimeout(() => startMobileGame(), 50);
        });
        setupTouchEvents(startButton);
    }
    
    // OX 버튼
    const trueBtn = document.getElementById('true-btn');
    const falseBtn = document.getElementById('false-btn');
    
    function handleOClick() {
        if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) return;
        
        console.log('O 버튼 클릭됨');
        
        safeVibrate(30);
        trueBtn.classList.add('vibrate');
        setTimeout(() => trueBtn.classList.remove('vibrate'), 200);
        
        setTimeout(() => handleMobileAnswer('O'), 10);
    }
    
    function handleXClick() {
        if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) return;
        
        console.log('X 버튼 클릭됨');
        
        safeVibrate(30);
        falseBtn.classList.add('vibrate');
        setTimeout(() => falseBtn.classList.remove('vibrate'), 200);
        
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
            if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) return;
            
            safeVibrate(50);
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 200);
            
            setTimeout(() => usePotion(), 10);
        });
        setupTouchEvents(potionBtn);
    }
    
    // 결과 화면 버튼
    const nextBtn = document.getElementById('next-button');
    const retryBtn = document.getElementById('retry-button');
    
    function handleNextClick() {
        console.log('다음 층 버튼 클릭됨');
        
        safeVibrate(50);
        nextBtn.classList.add('vibrate');
        setTimeout(() => nextBtn.classList.remove('vibrate'), 200);
        
        setTimeout(() => nextMobileFloor(), 50);
    }
    
    function handleRetryClick() {
        console.log('다시 시작 버튼 클릭됨');
        
        safeVibrate(50);
        retryBtn.classList.add('vibrate');
        setTimeout(() => retryBtn.classList.remove('vibrate'), 200);
        
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

// 터치 이벤트 설정 (진동 제거)
function setupTouchEvents(element) {
    if (!element) return;
    
    element.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.95)';
        // 진동 제거 - setupMobileEventListeners에서 처리
        if (e.cancelable) e.preventDefault();
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
}

// 게임 시작
function startMobileGame() {
    if (gameStartInProgress || mobileGameState.isBattleActive) return;
    
    gameStartInProgress = true;
    console.log('게임 시작');
    
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
    
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    preloadQuestions();
    
    const gameContainer = document.querySelector('.game-container');
    gameContainer.classList.add('screen-shake');
    setTimeout(() => {
        gameContainer.classList.remove('screen-shake');
    }, 300);
    
    updateMobileMonster();
    
    setTimeout(() => {
        generateMobileQuestion();
        gameStartInProgress = false;
    }, 500);
    
    updateMonsterSpeech('welcome');
}

// 몬스터 업데이트
function updateMobileMonster() {
    let monster;
    
    if (gameDataLoaded && mobileMonsters.length > 0) {
        const monsterIndex = Math.min(mobileGameState.currentFloor - 1, mobileMonsters.length - 1);
        monster = mobileMonsters[monsterIndex];
        mobileGameState.currentMonster = monsterIndex;
    } else {
        const monsterIndex = Math.min(mobileGameState.currentFloor - 1, defaultMonsters.length - 1);
        monster = defaultMonsters[monsterIndex];
        mobileGameState.currentMonster = monsterIndex;
    }
    
    mobileGameState.monsterMaxHP = monster.baseHP;
    mobileGameState.monsterHP = mobileGameState.monsterMaxHP;
    
    const monsterCircle = document.querySelector('.monster-circle');
    monsterCircle.style.animation = 'monsterPulse 1.5s infinite alternate, floatUpDown 2s infinite ease-in-out';
    
    document.getElementById('monster-emoji').textContent = monster.emoji;
    document.getElementById('monster-name').textContent = monster.name;
    document.getElementById('monster-level').textContent = monster.level;
    document.getElementById('floor-number').textContent = mobileGameState.currentFloor;
    
    updateMobileUI();
}

// 문제 생성
function generateMobileQuestion() {
    if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) return;
    
    mobileGameState.isProcessing = true;
    
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    let questionData;
    
    if (questionCache.length > 0) {
        const randomIndex = Math.floor(Math.random() * questionCache.length);
        questionData = questionCache[randomIndex];
    } else {
        questionData = {
            category: '민법',
            question: "민법상 20세 미만의 미성년자는 법정대리인의 동의 없이 계약을 체결할 수 없다. (정답: O)",
            answer: "O"
        };
    }
    
    mobileGameState.currentQuestion = questionData;
    mobileGameState.timer = 10.0;
    
    const questionBox = document.querySelector('.question-box');
    questionBox.classList.add('vibrate');
    setTimeout(() => {
        questionBox.classList.remove('vibrate');
    }, 200);
    
    document.getElementById('question-text').textContent = questionData.question;
    document.getElementById('question-type').textContent = questionData.category + ' 문제';
    document.getElementById('question-category').textContent = questionData.category;
    
    updateTimerDisplay();
    updateMonsterSpeech('battle_start');
    
    let timerCounter = 100;
    
    mobileGameState.timerInterval = setInterval(() => {
        timerCounter--;
        mobileGameState.timer = timerCounter / 10;
        
        if (timerCounter <= 30 && timerCounter > 29) {
            const timerCircle = document.querySelector('.timer-circle');
            if (timerCircle) timerCircle.classList.add('vibrate');
            safeVibrate([100, 50, 100]);
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

// 포션 사용
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
    mobileGameState.potions--;
    
    const healAmount = Math.min(30, mobileGameState.heroMaxHP - mobileGameState.heroHP);
    mobileGameState.heroHP += healAmount;
    
    playSound('potion-sound');
    safeVibrate([50, 100, 50]);
    
    const healEffect = document.createElement('div');
    healEffect.className = 'heal-effect';
    document.body.appendChild(healEffect);
    
    setTimeout(() => {
        healEffect.remove();
    }, 500);
    
    showDamageEffect(healAmount, 'hero', 'heal');
    
    const potionDisplay = document.querySelector('.potion-display');
    if (potionDisplay) {
        potionDisplay.classList.add('explode');
        setTimeout(() => {
            potionDisplay.classList.remove('explode');
        }, 500);
    }
    
    updateMonsterSpeech('potion');
    updateMobileUI();
    
    setTimeout(() => {
        mobileGameState.isProcessing = false;
    }, 1000);
}

// 말풍선 업데이트
function updateMonsterSpeech(type, customText = null) {
    const speechElement = document.getElementById('speech-text');
    if (!speechElement) return;
    
    let text = customText || getMonsterDialog(type);
    
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
    if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) return;
    
    mobileGameState.isProcessing = true;
    
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    const isCorrect = (answer === mobileGameState.currentQuestion.answer);
    
    const clickedBtn = answer === 'O' ? document.getElementById('true-btn') : document.getElementById('false-btn');
    if (clickedBtn) {
        clickedBtn.classList.add('explode');
        setTimeout(() => {
            clickedBtn.classList.remove('explode');
        }, 300);
    }
    
    safeVibrate(isCorrect ? [100, 50, 100] : [200, 100, 200]);
    
    if (isCorrect) {
        mobileGameState.combo++;
        mobileGameState.maxCombo = Math.max(mobileGameState.maxCombo, mobileGameState.combo);
        
        const damage = Math.floor(20 + mobileGameState.combo * 3);
        mobileGameState.monsterHP -= damage;
        
        playSound('correct-sound');
        
        if (mobileGameState.combo >= 3) {
            showComboEffect();
            updateMonsterSpeech('combo');
            safeVibrate([50, 30, 50, 30, 50]);
        } else {
            updateMonsterSpeech('correct');
        }
        
        const monsterCircle = document.querySelector('.monster-circle');
        if (monsterCircle) {
            monsterCircle.classList.add('screen-shake');
            setTimeout(() => {
                monsterCircle.classList.remove('screen-shake');
            }, 500);
        }
        
        showDamageEffect(damage, 'monster');
        
        if (mobileGameState.monsterHP <= 0) {
            mobileGameState.monsterHP = 0;
            monsterDefeated();
            return;
        }
    } else {
        mobileGameState.combo = 0;
        
        const damage = Math.floor(15 + (mobileGameState.currentFloor - 1) * 2);
        mobileGameState.heroHP -= damage;
        
        playSound('wrong-sound');
        showDamageEffect(damage, 'hero');
        
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            gameContainer.classList.add('screen-shake');
            setTimeout(() => {
                gameContainer.classList.remove('screen-shake');
            }, 500);
        }
        
        updateMonsterSpeech('incorrect');
        
        if (mobileGameState.heroHP <= 0) {
            mobileGameState.heroHP = 0;
            gameOver();
            return;
        }
    }
    
    updateMobileUI();
    
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
    
    playSound('wrong-sound');
    safeVibrate([300, 100, 300]);
    
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
    
    playSound('correct-sound');
    safeVibrate([100, 50, 100, 50, 200]);
    
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
    
    playSound('wrong-sound');
    safeVibrate([500, 200, 500]);
    
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
    
    document.getElementById('result-floor').textContent = mobileGameState.currentFloor + '층';
    document.getElementById('result-combo').textContent = mobileGameState.maxCombo + '회';
    document.getElementById('result-hp').textContent = mobileGameState.heroHP;
    document.getElementById('result-potions').textContent = mobileGameState.potions + '개';
    
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
    if (nextFloorInProgress) return;
    
    nextFloorInProgress = true;
    console.log('다음 층으로 이동');
    
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    mobileGameState.currentFloor++;
    mobileGameState.combo = 0;
    mobileGameState.isBattleActive = true;
    mobileGameState.isProcessing = false;
    
    if (mobileGameState.currentFloor % 3 === 0) {
        mobileGameState.potions++;
        updateMonsterSpeech('potion', `포션을 획득했다! (현재 ${mobileGameState.potions}개)`);
    }
    
    const healAmount = Math.min(mobileGameState.heroMaxHP * 0.5, mobileGameState.heroMaxHP - mobileGameState.heroHP);
    mobileGameState.heroHP += healAmount;
    
    const floorNumber = document.getElementById('floor-number');
    if (floorNumber) {
        floorNumber.classList.add('explode');
        setTimeout(() => {
            floorNumber.classList.remove('explode');
        }, 300);
    }
    
    const resultScreen = document.getElementById('result-screen');
    if (resultScreen) {
        resultScreen.style.display = 'none';
    }
    
    setTimeout(() => {
        updateMobileMonster();
        updateMonsterSpeech('welcome');
        
        setTimeout(() => {
            generateMobileQuestion();
            nextFloorInProgress = false;
        }, 1000);
    }, 300);
}

// 다시 시작
function retryMobileGame() {
    if (retryInProgress) return;
    
    retryInProgress = true;
    console.log('게임 다시 시작');
    
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
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
    
    const resultScreen = document.getElementById('result-screen');
    if (resultScreen) {
        resultScreen.style.display = 'none';
    }
    
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.classList.add('screen-shake');
        setTimeout(() => {
            gameContainer.classList.remove('screen-shake');
        }, 500);
    }
    
    setTimeout(() => {
        updateMobileMonster();
        updateMonsterSpeech('welcome');
        
        setTimeout(() => {
            generateMobileQuestion();
            retryInProgress = false;
            gameStartInProgress = false;
        }, 1000);
    }, 300);
}

// UI 업데이트
function updateMobileUI() {
    const heroHpPercent = (mobileGameState.heroHP / mobileGameState.heroMaxHP) * 100;
    const monsterHpPercent = (mobileGameState.monsterHP / mobileGameState.monsterMaxHP) * 100;
    
    const heroHpFill = document.getElementById('hero-hp-fill');
    const monsterHpFill = document.getElementById('monster-hp-fill');
    
    if (heroHpFill) {
        heroHpFill.style.width = `${heroHpPercent}%`;
        if (heroHpPercent < 30) {
            heroHpFill.classList.add('vibrate');
        } else {
            heroHpFill.classList.remove('vibrate');
        }
    }
    
    if (monsterHpFill) {
        monsterHpFill.style.width = `${monsterHpPercent}%`;
    }
    
    const heroHpText = document.getElementById('hero-hp-text');
    const monsterHpText = document.getElementById('monster-hp-text');
    
    if (heroHpText) {
        heroHpText.textContent = `${mobileGameState.heroHP}/${mobileGameState.heroMaxHP}`;
    }
    
    if (monsterHpText) {
        monsterHpText.textContent = `${Math.max(0, mobileGameState.monsterHP)}/${mobileGameState.monsterMaxHP}`;
    }
    
    const heroHpValue = document.getElementById('hero-hp-value');
    const comboValue = document.getElementById('combo-value');
    const potionCount = document.getElementById('potion-count');
    
    if (heroHpValue) heroHpValue.textContent = mobileGameState.heroHP;
    if (comboValue) comboValue.textContent = mobileGameState.combo;
    if (potionCount) potionCount.textContent = mobileGameState.potions;
    
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
                // 오류 무시
            });
        } catch (e) {
            // 오류 무시
        }
    }
}

// 빠른 초기화 함수
function quickInitialize() {
    console.log('빠른 초기화 시작');
    
    if (typeof questionsData === 'undefined') {
        window.questionsData = {
            '민법': [
                { question: "민법상 20세 미만의 미성년자는 법정대리인의 동의 없이 계약을 체결할 수 없다. (정답: O)", answer: "O" },
                { question: "특허권의 존속기간은 출원일로부터 20년이다. (정답: O)", answer: "O" }
            ]
        };
    }
    
    loadGameData();
    
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

// setupMobileScroll 함수 정의 (에러 방지)
function setupMobileScroll() {
    // 이 함수는 호출되지만 현재 버전에서는 필요하지 않음
    // 에러 방지를 위해 빈 함수로 정의
    console.log('setupMobileScroll: 스크롤 설정 (현재 버전에서는 사용되지 않음)');
}