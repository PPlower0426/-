// 기존 click 이벤트에 터치 이벤트 추가
function addMobileTouchEvents() {
    // OX 버튼
    const trueBtn = document.getElementById('answer-true');
    const falseBtn = document.getElementById('answer-false');
    
    // 터치 시작 시 피드백
    [trueBtn, falseBtn].forEach(btn => {
        if (!btn) return;
        
        // 터치 시작 시 효과
        btn.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
            e.preventDefault(); // 기본 동작 방지 (더블 탭 줌 등)
        });
        
        // 터치 끝나면 원래대로
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        // 터치로 이동하면 원래대로 (터치 취소)
        btn.addEventListener('touchmove', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // 시작 버튼
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
        startBtn.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateY(-8px) scale(0.98)';
            e.preventDefault();
        });
        startBtn.addEventListener('touchend', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
    }
}
// ==============================================
// 모바일 감지 및 최적화 (수정됨 - PC와 동일한 게임 내용 유지)
// ==============================================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 모바일 최적화 적용 (PC와 게임 내용 동일)
if (isMobile) {
    // 1. 모바일 클래스 추가
    document.body.classList.add('mobile');
    
    // 2. PC와 동일한 게임 경험 유지 (애니메이션 제한 제거)
    // 기존에 불필요한 애니메이션을 제한했던 부분 제거
    
    // 3. 모바일 전용 효과 추가 (게임 밸런스 영향 없음)
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        /* 모바일 전용 터치 피드백 */
        .mobile .answer-btn:active {
            transform: scale(0.95) !important;
            transition: transform 0.1s ease !important;
        }
        
        .mobile #start-game-btn:active {
            transform: translateY(-8px) scale(0.98) !important;
            transition: transform 0.1s ease !important;
        }
        
        /* 모바일 전용 진동 효과 (CSS로 대체) */
        @keyframes mobileVibrate {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
        
        @keyframes mobileShake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
            20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        
        @keyframes mobilePulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes mobileGlow {
            0%, 100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
            50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.6); }
        }
        
        /* 모바일 전용 물결 효과 */
        .mobile .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* 모바일 전용 터치 하이라이트 */
        .mobile .touch-highlight {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, 
                      rgba(255, 255, 255, 0.3) 0%, 
                      rgba(255, 255, 255, 0) 70%);
            border-radius: 20px;
            opacity: 0;
            pointer-events: none;
            animation: touchHighlight 0.3s ease-out;
        }
        
        @keyframes touchHighlight {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 0.5; }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
        }
        
        /* 모바일 전용 콤보 효과 */
        .mobile .combo-effect {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            font-weight: bold;
            color: #ffd700;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
            opacity: 0;
            pointer-events: none;
            z-index: 100;
            animation: comboFloat 1s ease-out;
        }
        
        @keyframes comboFloat {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            20% { opacity: 1; transform: translate(-50%, -80%) scale(1.2); }
            100% { opacity: 0; transform: translate(-50%, -150%) scale(0.8); }
        }
        
        /* 모바일 전용 히트 효과 */
        .mobile .mobile-hit-effect {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, 
                      rgba(255, 107, 107, 0.4) 0%, 
                      rgba(255, 107, 107, 0) 70%);
            opacity: 0;
            pointer-events: none;
            animation: mobileHitFlash 0.5s ease-out;
        }
        
        @keyframes mobileHitFlash {
            0% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 0.7; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.2); }
        }
        
        /* 모바일 전용 스파클 효과 */
        .mobile .sparkle {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #fff;
            border-radius: 50%;
            opacity: 0;
            pointer-events: none;
            animation: sparkleFly 1s ease-out forwards;
        }
        
        @keyframes sparkleFly {
            0% { opacity: 1; transform: translate(0, 0) scale(1); }
            100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }
    `;
    document.head.appendChild(mobileStyle);
    
    // 4. 터치를 위한 스크롤 허용
    document.querySelector('.question-box').style.webkitOverflowScrolling = 'touch';
}

// ==============================================
// 모바일 전용 효과 추가 (수정됨)
// ==============================================
function addMobileTouchEvents() {
    if (!isMobile) return;
    
    // OX 버튼
    const trueBtn = document.getElementById('answer-true');
    const falseBtn = document.getElementById('answer-false');
    
    [trueBtn, falseBtn].forEach(btn => {
        if (!btn) return;
        
        btn.addEventListener('touchstart', function(e) {
            // 1. 기본 스케일 효과
            this.style.transform = 'scale(0.95)';
            
            // 2. 물결 효과 추가
            createRippleEffect(e, this);
            
            // 3. 터치 하이라이트
            createTouchHighlight(this);
            
            // 4. 미세한 진동 효과 (CSS 애니메이션으로 대체)
            this.style.animation = 'mobileVibrate 0.1s ease-out';
            
            // 5. 스파클 효과 (정답 버튼일 때만)
            if (this.dataset.answer === 'O') {
                createSparkleEffect(this, '#4ecdc4');
            } else {
                createSparkleEffect(this, '#ff6b6b');
            }
            
            e.preventDefault();
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            this.style.animation = '';
        });
        
        btn.addEventListener('touchmove', function() {
            this.style.transform = 'scale(1)';
            this.style.animation = '';
        });
    });
    
    // 시작 버튼
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
        startBtn.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateY(-8px) scale(0.98)';
            createRippleEffect(e, this);
            createTouchHighlight(this);
            createSparkleEffect(this, '#ffd700');
            e.preventDefault();
        });
        
        startBtn.addEventListener('touchend', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.05)';
            }, 100);
        });
    }
    
    // 포션 버튼
    const potionBtn = document.getElementById('mini-potion-btn');
    if (potionBtn) {
        potionBtn.addEventListener('touchstart', function(e) {
            createRippleEffect(e, this);
            createSparkleEffect(this, '#4ecdc4');
        });
    }
}

// ==============================================
// 모바일 전용 효과 생성 함수들
// ==============================================

// 1. 물결 효과
function createRippleEffect(event, element) {
    if (!isMobile) return;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left - size / 2;
    const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top - size / 2;
    
    ripple.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode === element) {
            element.removeChild(ripple);
        }
    }, 600);
}

// 2. 터치 하이라이트
function createTouchHighlight(element) {
    if (!isMobile) return;
    
    const highlight = document.createElement('div');
    highlight.classList.add('touch-highlight');
    
    element.appendChild(highlight);
    
    setTimeout(() => {
        if (highlight.parentNode === element) {
            element.removeChild(highlight);
        }
    }, 300);
}

// 3. 콤보 효과
function showMobileComboEffect() {
    if (!isMobile || gameState.combo < 3) return;
    
    const comboEffect = document.createElement('div');
    comboEffect.classList.add('combo-effect');
    comboEffect.textContent = `${gameState.combo} COMBO!`;
    
    const gameContainer = document.querySelector('.game-container');
    gameContainer.appendChild(comboEffect);
    
    setTimeout(() => {
        if (comboEffect.parentNode === gameContainer) {
            gameContainer.removeChild(comboEffect);
        }
    }, 1000);
}

// 4. 히트 효과
function showMobileHitEffect(isCritical = false) {
    if (!isMobile) return;
    
    const hitEffect = document.createElement('div');
    hitEffect.classList.add('mobile-hit-effect');
    
    if (isCritical) {
        hitEffect.style.background = `radial-gradient(circle at center, 
            rgba(255, 215, 0, 0.5) 0%, 
            rgba(255, 215, 0, 0) 70%)`;
    }
    
    const monsterSection = document.querySelector('.monster-section');
    if (monsterSection) {
        monsterSection.appendChild(hitEffect);
        
        setTimeout(() => {
            if (hitEffect.parentNode === monsterSection) {
                monsterSection.removeChild(hitEffect);
            }
        }, 500);
    }
}

// 5. 스파클 효과
function createSparkleEffect(element, color = '#ffffff') {
    if (!isMobile) return;
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        const rect = element.getBoundingClientRect();
        const x = rect.width / 2;
        const y = rect.height / 2;
        
        // 랜덤 방향으로 날아가기
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        sparkle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            background: ${color};
            --tx: ${tx}px;
            --ty: ${ty}px;
            animation-delay: ${i * 0.1}s;
        `;
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode === element) {
                element.removeChild(sparkle);
            }
        }, 1000);
    }
}

// 6. 모바일 전용 진동 효과 (CSS 애니메이션 대체)
function triggerMobileVibration(type) {
    if (!isMobile) return;
    
    const monsterEmoji = document.getElementById('monster-emoji');
    if (!monsterEmoji) return;
    
    switch(type) {
        case 'correct':
            monsterEmoji.style.animation = 'mobilePulse 0.3s ease-out';
            break;
        case 'incorrect':
            monsterEmoji.style.animation = 'mobileShake 0.5s ease-out';
            break;
        case 'critical':
            monsterEmoji.style.animation = 'mobileGlow 0.5s ease-in-out 2';
            break;
    }
    
    setTimeout(() => {
        monsterEmoji.style.animation = '';
    }, 500);
}

// ==============================================
// 기존 함수에 모바일 효과 통합
// ==============================================

// 답변 처리 함수 수정
function handleAnswer(isCorrect) {
    // 기존 로직은 그대로 유지...
    gameState.isProcessing = true;
    
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    // 모바일 전용 효과 추가
    if (isMobile) {
        if (isCorrect) {
            triggerMobileVibration('correct');
            showMobileHitEffect();
            
            // 콤보 효과
            if (gameState.combo >= 3) {
                showMobileComboEffect();
            }
        } else {
            triggerMobileVibration('incorrect');
        }
    }
    
    // 나머지 기존 로직...
    if (isCorrect) {
        gameState.combo++;
        
        if (gameState.combo >= 3) {
            showMonsterDialog('combo');
        } else {
            showMonsterDialog('correct');
        }
        
        playSound('correct-sound', 0.6);
        
        const eventType = processRandomEvents();
        
        if (eventType === 'dodge') {
            showDamagePopup(DamageType.DODGE, 0);
            addDamageLog(DamageType.DODGE, 0);
            showMonsterDialog('correct');
            playSound('dodge-sound', 0.5);
            
            gameState.isProcessing = false;
            
            setTimeout(() => {
                if (gameState.isBattleActive && gameState.monsterHP > 0 && gameState.heroHP > 0) {
                    generateNewQuestion();
                }
            }, 1500);
            
            return;
        }
        
        createHitEffect();
        playSound('hit-sound', 0.4);
        
        let baseDamage = Math.floor(20 + gameState.combo * 3);
        const isCritical = (eventType === 'critical');
        
        if (isCritical) {
            baseDamage = Math.floor(baseDamage * gameState.criticalMultiplier);
            // 모바일 전용 크리티컬 효과
            if (isMobile) {
                triggerMobileVibration('critical');
                showMobileHitEffect(true);
            }
        }
        
        monsterTakeDamage(baseDamage, isCritical);
        
    } else {
        gameState.combo = 0;
        showMonsterDialog('incorrect');
        playSound('wrong-sound', 0.6);
        heroTakeDamage();
    }
    
    updateUI();
    
    if (gameState.isBattleActive && gameState.monsterHP > 0 && gameState.heroHP > 0) {
        setTimeout(() => {
            gameState.dodgeActive = false;
            gameState.regenActive = false;
            gameState.specialEventActive = false;
            
            gameState.isProcessing = false;
            generateNewQuestion();
        }, 1500);
    } else {
        gameState.isProcessing = false;
    }
}

// 몬스터 처치 시 모바일 효과 추가
function monsterDefeated() {
    // 기존 로직...
    
    // 모바일 전용 효과
    if (isMobile) {
        const monsterSection = document.querySelector('.monster-section');
        if (monsterSection) {
            // 승리 스파클 효과
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    createSparkleEffect(monsterSection, ['#ffd700', '#4ecdc4', '#ff6b6b'][Math.floor(Math.random() * 3)]);
                }, i * 100);
            }
        }
    }
    
    // 나머지 기존 로직...
}

// 포션 사용 시 모바일 효과
function usePotion() {
    if (gameState.potions <= 0 || gameState.heroHP >= gameState.heroMaxHP || gameState.isProcessing) {
        return;
    }
    
    // 모바일 전용 효과
    if (isMobile) {
        const potionBtn = document.getElementById('mini-potion-btn');
        if (potionBtn) {
            potionBtn.style.animation = 'mobilePulse 0.5s ease-out';
            setTimeout(() => {
                potionBtn.style.animation = '';
            }, 500);
        }
    }
    
    // 나머지 기존 로직...
}

// ==============================================
// 모바일 UI 업데이트 (PC와 동일한 정보 표시)
// ==============================================
function updateMobileUI() {
    if (!isMobile) return;
    
    // PC와 동일한 정보 유지
    // 폰트 크기나 여백만 약간 조정
    const comboDisplay = document.querySelector('.combo-display');
    const potionDisplay = document.querySelector('.potion-count');
    
    // 정보는 동일하게 표시하되, 가독성 향상
    if (window.innerWidth < 400) {
        comboDisplay.style.fontSize = '0.85em';
        potionDisplay.style.fontSize = '0.85em';
    }
    
    // 버튼 크기 조정 (터치 영역 확대)
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => {
        btn.style.minHeight = '44px'; // Apple의 최소 터치 영역
    });
}

// ==============================================
// 게임 로드 시 모바일 최적화 적용
// ==============================================
window.addEventListener('load', () => {
    if (isMobile) {
        console.log('모바일 디바이스 감지, 터치 효과 활성화');
        
        // 모바일 터치 이벤트 추가
        addMobileTouchEvents();
        
        // 모바일 UI 업데이트
        updateMobileUI();
        
        // 모바일 스크롤 설정
        setupMobileScroll();
        
        // 모바일 전용 안내 메시지
        const mobileGuide = document.createElement('div');
        mobileGuide.className = 'mobile-guide';
        mobileGuide.innerHTML = `
            <div style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); 
                       background: rgba(0,0,0,0.8); color: white; padding: 10px 20px; 
                       border-radius: 20px; font-size: 0.9rem; z-index: 9999; 
                       border: 2px solid #4ecdc4; text-align: center;">
                ✨ 모바일 최적화 모드 ✨<br>
                <small>PC와 동일한 게임, 향상된 터치 경험</small>
            </div>
        `;
        document.body.appendChild(mobileGuide);
        
        // 3초 후 안내 메시지 제거
        setTimeout(() => {
            if (mobileGuide.parentNode) {
                mobileGuide.remove();
            }
        }, 3000);
    }
});
// ==============================================
// 20개 몬스터 정보 (체력 증가 및 확률 조정)
// ==============================================
const monsterInfos = [
    { // 1층
        emoji: '👹',
        name: '진입 문지기',
        personality: '쾌활함',
        baseHP: 120,
        criticalChance: 0.12,
        dodgeChance: 0.10,
        poisonChance: 0.12,
        regenChance: 0.18
    },
    { // 2층
        emoji: '👿',
        name: '독서실 빌런',
        personality: '짜증냄',
        baseHP: 150,
        criticalChance: 0.14,
        dodgeChance: 0.11,
        poisonChance: 0.13,
        regenChance: 0.19
    },
    { // 3층
        emoji: '🤡',
        name: '담보물권 삐에로',
        personality: '계속 웃음',
        baseHP: 180,
        criticalChance: 0.16,
        dodgeChance: 0.12,
        poisonChance: 0.14,
        regenChance: 0.20
    },
    { // 4층
        emoji: '👻',
        name: '귀여운 애기 귀신',
        personality: '칭구야~',
        baseHP: 220,
        criticalChance: 0.18,
        dodgeChance: 0.13,
        poisonChance: 0.15,
        regenChance: 0.21
    },
    { // 5층
        emoji: '💀',
        name: '점심 굶은 고시생',
        personality: '배고파....',
        baseHP: 270,
        criticalChance: 0.20,
        dodgeChance: 0.14,
        poisonChance: 0.16,
        regenChance: 0.22
    },
    { // 6층
        emoji: '🐉',
        name: '그냥 용',
        personality: '아무 말 없음',
        baseHP: 330,
        criticalChance: 0.22,
        dodgeChance: 0.15,
        poisonChance: 0.17,
        regenChance: 0.23
    },
    { // 7층
        emoji: '🦖',
        name: '17학번 공룡 선배',
        personality: '아재개그함',
        baseHP: 400,
        criticalChance: 0.24,
        dodgeChance: 0.16,
        poisonChance: 0.18,
        regenChance: 0.24
    },
    { // 8층
        emoji: '🦈',
        name: '조금 큰 물고기',
        personality: '잡아먹어버린다',
        baseHP: 480,
        criticalChance: 0.26,
        dodgeChance: 0.17,
        poisonChance: 0.19,
        regenChance: 0.25
    },
    { // 9층
        emoji: '👾',
        name: '게임중독 고시생',
        personality: '게임이 하고 싶다...',
        baseHP: 570,
        criticalChance: 0.28,
        dodgeChance: 0.18,
        poisonChance: 0.20,
        regenChance: 0.26
    },
    { // 10층
        emoji: '🤖',
        name: '생동차 변리사 기계',
        personality: '삐빅',
        baseHP: 670,
        criticalChance: 0.30,
        dodgeChance: 0.19,
        poisonChance: 0.21,
        regenChance: 0.27
    },
    { // 11층
        emoji: '☠️',
        name: '12수 고시생',
        personality: '...',
        baseHP: 780,
        criticalChance: 0.32,
        dodgeChance: 0.20,
        poisonChance: 0.22,
        regenChance: 0.28
    },
    { // 12층
        emoji: '👺',
        name: '술취한 아저씨',
        personality: '술취한 말투',
        baseHP: 900,
        criticalChance: 0.34,
        dodgeChance: 0.21,
        poisonChance: 0.23,
        regenChance: 0.29
    },
    { // 13층
        emoji: '🧟',
        name: '그냥 고시생',
        personality: '좀비같음',
        baseHP: 1030,
        criticalChance: 0.36,
        dodgeChance: 0.22,
        poisonChance: 0.24,
        regenChance: 0.30
    },
    { // 14층
        emoji: '🧛',
        name: '초동안 40세 고시생',
        personality: '드라큘라 컨셉',
        baseHP: 1170,
        criticalChance: 0.38,
        dodgeChance: 0.23,
        poisonChance: 0.25,
        regenChance: 0.31
    },
    { // 15층
        emoji: '🧞',
        name: '찍맞의 지니',
        personality: '소원 들어줌',
        baseHP: 1320,
        criticalChance: 0.40,
        dodgeChance: 0.24,
        poisonChance: 0.26,
        regenChance: 0.32
    },
    { // 16층
        emoji: '🎃',
        name: '할로위인',
        personality: '낄낄 거림',
        baseHP: 1480,
        criticalChance: 0.42,
        dodgeChance: 0.25,
        poisonChance: 0.27,
        regenChance: 0.33
    },
    { // 17층
        emoji: '🐦‍🔥',
        name: '한번더 피닉스',
        personality: '불사조',
        baseHP: 1650,
        criticalChance: 0.44,
        dodgeChance: 0.26,
        poisonChance: 0.28,
        regenChance: 0.34
    },
    { // 18층
        emoji: '👽',
        name: '외계인',
        personality: '재수없음',
        baseHP: 1830,
        criticalChance: 0.46,
        dodgeChance: 0.27,
        poisonChance: 0.29,
        regenChance: 0.35
    },
    { // 19층
        emoji: '🧌',
        name: '뒤통수 머신',
        personality: '뒤통수를 때림',
        baseHP: 2020,
        criticalChance: 0.48,
        dodgeChance: 0.28,
        poisonChance: 0.30,
        regenChance: 0.36
    },
    { // 20층 - 최종보스 (100문제 필요)
        emoji: '🦹',
        name: '대마왕',
        personality: '무시하고 비하',
        baseHP: 3000, // 기하급수적으로 증가한 체력
        criticalChance: 0.31,  // 극단적이지 않게 조정
        dodgeChance: 0.3,     // 극단적이지 않게 조정
        poisonChance: 0.4,    // 극단적이지 않게 조정
        regenChance: 0.50      // 극단적이지 않게 조정
    }
];

// ==============================================
// 몬스터 대사 - 각 층별로 다른 대사 (동일)
// ==============================================
const monsterDialogsByFloor = [
    { // 1층 - 진입 문지기 (쾌활함)
        'welcome': ['합격의 탑에 오신 것을 환영합니다! 즐겁게 게임해요!', '첫 관문을 통과해봐요!'],
        'battle_start': ['자, 시작해볼까요? 정답을 맞춰보세요!', '문제를 해결해봐요!'],
        'correct': ['정답이에요! 잘 하시네요!', '맞췄어요! 대단해요!'],
        'incorrect': ['아쉽네요! 다시 도전해보세요!', '틀렸어요! 힘내요!'],
        'timeout': ['시간이 다 됐어요! 더 빠르게 답해보세요!', '시간 초과! 다음엔 더 빨리!'],
        'victory': ['제가 졌네요! 다음 층으로 가세요!', '이겼어요! 다음 층이 기다리고 있어요!'],
        'defeat': ['이번에는 제가 이겼어요! 다시 도전하세요!', '패배했어요! 처음부터 다시!'],
        'combo': ['와우! 연속으로 맞추시네요!', '콤보 대단해요!'],
        'potion': ['물약을 드셨네요! 힘내세요!', '회복했어요! 잘 했어요!']
    },
    { // 2층 - 독서실 빌런 (짜증냄)
        'welcome': ['아... 또 왔어? 빨리빨리 해.', '제발 조용히 해...'],
        'battle_start': ['시작한다... 빨리 끝내자.', '문제나 빨리 풀어.'],
        'correct': ['어... 맞았네.', '정답인데... 짜증나.'],
        'incorrect': ['역시 틀렸지. 예상했어.', '틀렸어. 당연히.'],
        'timeout': ['시간 다 됐어. 답답해.', '너무 느려. 짜증나.'],
        'victory': ['쳇... 이겼네. 다음 층 가.', '이긴 건 축하해. 빨리 가.'],
        'defeat': ['내가 이겼지. 당연해.', '패배야. 다시 시작해.'],
        'combo': ['계속 맞추네... 짜증나.', '콤보? 그만해.'],
        'potion': ['물약 마셨구나. 별거 아니야.', '회복했네. 어쩌라고.']
    },
    { // 3층 - 담보물권 삐에로 (계속 웃음)
        'welcome': ['하하하! 환영합니다! 즐거운 게임 되세요!', '호호호! 첫 번째 관문입니다!'],
        'battle_start': ['헤헤헤! 문제를 풀어보세요!', '하하! 정답을 맞춰보세요!'],
        'correct': ['하하하! 정답입니다! 잘했어요!', '호호호! 맞췄어요! 재미있죠?'],
        'incorrect': ['히히히! 틀렸어요! 다시 시도해보세요!', '하하! 틀렸네요! 웃기죠?'],
        'timeout': ['하하하! 시간 초과! 더 빨리!', '호호호! 너무 느려요!'],
        'victory': ['하하하! 제가 졌어요! 다음 층으로!', '호호호! 이겼어요! 축하해요!'],
        'defeat': ['하하하! 제가 이겼어요! 다시 도전하세요!', '히히히! 패배했어요! 웃기죠?'],
        'combo': ['와하하! 콤보 대단해요!', '하하하! 계속 맞추고 있어요!'],
        'potion': ['하하! 물약 마셨구나! 힘내!', '호호! 회복했네! 잘했어!']
    },
    { // 4층 - 귀여운 애기 귀신 (칭구야~)
        'welcome': ['칭구야~ 환영해!', '어서와~ 즐거운 게임 하자!'],
        'battle_start': ['칭구야~ 문제 풀어봐!', '자, 시작해볼까?'],
        'correct': ['칭구야~ 정답이야! 잘했어!', '맞췄어~ 대단해!'],
        'incorrect': ['칭구야~ 틀렸어...', '아쉽다~ 다시 해봐!'],
        'timeout': ['칭구야~ 시간 다 됐어!', '너무 느려~ 빨리해!'],
        'victory': ['칭구야~ 이겼어! 다음 층 가!', '이겼다~ 축하해!'],
        'defeat': ['칭구야~ 졌어... 다시 해봐!', '패배야~ 힘내!'],
        'combo': ['와~ 칭구야 콤보 대단해!', '계속 맞추고 있네~ 대단해!'],
        'potion': ['칭구야~ 물약 마셨구나!', '회복했네~ 잘했어!']
    },
    { // 5층 - 점심 굶은 고시생 (배고파....)
        'welcome': ['배고파.... 환영한다...', '오셨군... 배고프다...'],
        'battle_start': ['시작... 배고픈데...', '문제 풀어... 빨리...'],
        'correct': ['맞았다... 근데 배고파...', '정답... 밥 먹고 싶다...'],
        'incorrect': ['틀렸다... 배고픈데...', '오답... 힘들다...'],
        'timeout': ['시간 다 됐다... 배고파...', '느리다... 밥 주세요...'],
        'victory': ['이겼다... 다음 층... 밥...', '승리... 배고픈 승리다...'],
        'defeat': ['졌다... 배고파서 졌어...', '패배... 밥 생각나...'],
        'combo': ['콤보... 배고픈 콤보...', '계속 맞추네... 배고프다...'],
        'potion': ['물약... 배고픈 건 못 고쳐...', '회복... 밥은 안 주나...']
    },
    { // 6층 - 그냥 용 (아무 말 없음)
        'welcome': ['...', '...'],
        'battle_start': ['...', '...'],
        'correct': ['...', '...'],
        'incorrect': ['...', '...'],
        'timeout': ['...', '...'],
        'victory': ['...', '...'],
        'defeat': ['...', '...'],
        'combo': ['...', '...'],
        'potion': ['...', '...']
    },
    { // 7층 - 17학번 공룡 선배 (아재개그함)
        'welcome': ['와! 새내기 왔구먼! 아재 개그 하나 할까?', '옛날에 변리사 시험은... 하하!'],
        'battle_start': ['자, 시작한다! 문제가 공룡처럼 어렵다?', '풀어봐! 공룡도 풀 수 있어!'],
        'correct': ['정답! 공룡도 알아듣겠다!', '맞췄어! 내가 봐도 대단해!'],
        'incorrect': ['틀렸어! 공룡 시대에도 틀렸을 걸?', '오답! 공룡이 웃을 거야!'],
        'timeout': ['시간 초과! 공룡도 더 빨랐다!', '느려! 공룡 시대에도 느렸어!'],
        'victory': ['이겼다! 공룡 선배 인정!', '승리! 다음 층으로 가!'],
        'defeat': ['졌어! 공룡 시대에도 졌을 걸?', '패배! 다시 도전해!'],
        'combo': ['콤보! 공룡도 놀랐다!', '계속 맞추네! 대단해!'],
        'potion': ['물약 마셨구나! 공룡도 마셨을까?', '회복! 공룡도 회복했어!']
    },
    { // 8층 - 조금 큰 물고기 (잡아먹어버린다)
        'welcome': ['여기서 죽으면 잡아먹어버린다...', '물고기에게 잡아먹히고 싶지 않으면...'],
        'battle_start': ['문제를 풀어라... 안 풀면 먹는다...', '시작한다... 배고프다...'],
        'correct': ['정답이다... 아쉽게도 못 먹겠다...', '맞췄어... 다음 기회에...'],
        'incorrect': ['틀렸어... 이제 먹을 수 있겠다...', '오답... 맛있겠다...'],
        'timeout': ['시간 다 됐다... 식사 시간이다...', '느려... 쉽게 잡히겠다...'],
        'victory': ['이겼다... 배고픈 상태로 보내준다...', '승리... 다음 층으로 가라...'],
        'defeat': ['졌다... 이제 먹을 시간이다...', '패배... 맛있는 고기다...'],
        'combo': ['콤보... 살이 쪘겠다...', '계속 맞추네... 살이 올랐다...'],
        'potion': ['물약 마셨구나... 살이 더 올랐다...', '회복... 맛있어지겠다...']
    },
    { // 9층 - 게임중독 고시생 (게임이 하고 싶다...)
        'welcome': ['게임... 하고 싶다...', '공부 말고 게임하고 싶어...'],
        'battle_start': ['문제 풀어... 게임처럼 빨리...', '시작... 게임 시작...'],
        'correct': ['정답... 게임 클리어...', '맞췄어... 레벨 업...'],
        'incorrect': ['틀렸어... 게임 오버...', '오답... 다시 시도...'],
        'timeout': ['시간 초과... 게임처럼 빨리 해...', '느려... 게임 빨리해...'],
        'victory': ['이겼다... 다음 스테이지...', '승리... 보상 획득...'],
        'defeat': ['졌다... 게임 오버...', '패배... 컨티뉴...'],
        'combo': ['콤보... 연속 처치...', '계속 맞추네... 콤보 유지...'],
        'potion': ['물약 마셨구나... 체력 회복...', '회복... 게임처럼...']
    },
    { // 10층 - 생동차 변리사 기계 (삐빅)
        'welcome': ['삐빅! 환영합니다.', '삐빅! 합격의 탑 10층입니다.'],
        'battle_start': ['삐빅! 전투 시작합니다.', '삐빅! 문제 풀이 시작.'],
        'correct': ['삐빅! 정답입니다.', '삐빅! 맞췄습니다.'],
        'incorrect': ['삐빅! 오답입니다.', '삐빅! 틀렸습니다.'],
        'timeout': ['삐빅! 시간 초과입니다.', '삐빅! 너무 느립니다.'],
        'victory': ['삐빅! 승리했습니다.', '삐빅! 다음 층으로 이동합니다.'],
        'defeat': ['삐빅! 패배했습니다.', '삐빅! 처음부터 다시 시작하세요.'],
        'combo': ['삐빅! 콤보 중입니다.', '삐빅! 연속 정답입니다.'],
        'potion': ['삐빅! 물약 사용했습니다.', '삐빅! 체력 회복 중입니다.']
    },
    { // 11층 - 12수 고시생 (...)
        'welcome': ['.........', '.............'],
        'battle_start': ['.....', '.......'],
        'correct': ['.....', '.......'],
        'incorrect': ['.....', '.......'],
        'timeout': ['.....', '.......'],
        'victory': ['.....', '.......'],
        'defeat': ['.....', '.......'],
        'combo': ['.....', '.......'],
        'potion': ['.....', '.......']
    },
    { // 12층 - 술취한 아저씨 (술취한 말투)
        'welcome': ['어.. 왔네? 한잔 할까?', '환.. 환영한다! 술 마시자!'],
        'battle_start': ['자.. 시작한다! 취한 상태로 풀어봐!', '문.. 문제 풀어! 취해서 풀어!'],
        'correct': ['정.. 정답이네! 술이 깨겠다!', '맞.. 맞췄어! 한잔 더!'],
        'incorrect': ['틀.. 틀렸어! 술이 문제야!', '오.. 오답! 취해서 그렇지!'],
        'timeout': ['시.. 시간 다 됐어! 취해서 느려!', '너.. 너무 느려! 술 깨고 해!'],
        'victory': ['이.. 이겼다! 다음 층 가서 마시자!', '승.. 승리! 술 한잔 하러!'],
        'defeat': ['졌.. 졌어! 술 때문에 졌지!', '패.. 패배! 술 마시고 다시!'],
        'combo': ['콤.. 콤보 대단해! 술 깨겠다!', '계.. 계속 맞추네! 대단해!'],
        'potion': ['물.. 물약 마셨구나! 술 대신!', '회.. 회복! 술이 회복제!']
    },
    { // 13층 - 그냥 고시생 (좀비같음)
        'welcome': ['으어... 왔느냐...', '공부... 계속 해야 한다...'],
        'battle_start': ['문제... 풀어라...', '시작... 빨리...'],
        'correct': ['정답... 계속...', '맞췄다... 다음...'],
        'incorrect': ['틀렸다... 지친다...', '오답... 힘들다...'],
        'timeout': ['시간... 다 됐다...', '느리다... 빨리...'],
        'victory': ['이겼다... 다음 층...', '승리... 계속 가야 한다...'],
        'defeat': ['졌다... 다시...', '패배... 처음부터...'],
        'combo': ['콤보... 계속 맞춘다...', '연속... 정답...'],
        'potion': ['물약... 마셨다...', '회복... 조금 나아졌다...']
    },
    { // 14층 - 초동안 40세 고시생 (드라큘라 컨셉)
        'welcome': ['흐흐... 어서 오라, 젊은 피여...', '합격의 탑에 온 걸 환영한다...'],
        'battle_start': ['문제를 풀어보거라... 피가 마르기 전에...', '시작한다... 시간은 적다...'],
        'correct': ['정답이로다... 잘 했도다...', '맞췄구나... 젊은 피의 힘인가...'],
        'incorrect': ['틀렸도다... 피가 더 필요하겠구나...', '오답이로다... 실망이로다...'],
        'timeout': ['시간이 다 됐도다... 너무 느리구나...', '시간 초과로다... 피가 식겠구나...'],
        'victory': ['이겼도다... 다음 층으로 가거라...', '승리로다... 계속 나아가라...'],
        'defeat': ['졌도다... 피를 주거라...', '패배로다... 처음부터 다시 하거라...'],
        'combo': ['콤보로다... 젊은 피의 힘 대단하구나...', '계속 맞추는구나... 대단하도다...'],
        'potion': ['물약을 마셨구나... 피가 아닌 것을 마시다니...', '회복했구나... 피는 아니지만...']
    },
    { // 15층 - 찍맞의 지니 (소원 들어줌)
        'welcome': ['주인님! 소원을 들어드리겠습니다!', '환영합니다! 문제를 풀면 소원을!'],
        'battle_start': ['문제를 풀어주세요! 정답이 소원입니다!', '시작합니다! 소원을 위해!'],
        'correct': ['정답입니다! 소원 하나 들어드릴게요!', '맞췄어요! 소원이 뭔가요?'],
        'incorrect': ['틀렸어요... 소원은 다음 기회에...', '오답이에요... 아쉽지만...'],
        'timeout': ['시간 다 됐어요! 소원은 빨리!', '너무 느려요! 소원도 느리게?'],
        'victory': ['이겼어요! 소원 들어드릴게요!', '승리! 다음 층으로 소원과 함께!'],
        'defeat': ['졌어요... 소원은 다음에...', '패배... 소원은 이루어지지 않았어요...'],
        'combo': ['콤보 대단해요! 소원 많이 들어드릴게요!', '계속 맞추네요! 대단해요!'],
        'potion': ['물약 마셨구나! 소원은 건강이죠!', '회복했어요! 소원이 이루어졌네요!']
    },
    { // 16층 - 할로위인 (낄낄 거림)
        'welcome': ['낄낄낄! 환영한다!', '하하하! 무서운 게임 시작이다!'],
        'battle_start': ['낄낄! 문제 풀어봐!', '하하! 시작한다!'],
        'correct': ['낄낄낄! 정답이다!', '하하하! 맞췄어!'],
        'incorrect': ['낄낄! 틀렸어!', '하하! 오답이야!'],
        'timeout': ['낄낄낄! 시간 다 됐어!', '하하하! 너무 느려!'],
        'victory': ['낄낄! 이겼다! 다음 층!', '하하! 승리다!'],
        'defeat': ['낄낄! 졌어! 다시 해!', '하하! 패배야!'],
        'combo': ['낄낄낄! 콤보 대단해!', '하하하! 계속 맞추네!'],
        'potion': ['낄낄! 물약 마셨구나!', '하하! 회복했네!']
    },
    { // 17층 - 한번더 피닉스 (불사조)
        'welcome': ['나는 불사조! 죽지 않는다!', '다시 왔다! 올해도 시험 보러 왔다!'],
        'battle_start': ['시작한다! 나는 죽지 않아!', '문제 풀어봐! 나는 계속 돌아온다!'],
        'correct': ['정답! 나처럼 다시 살아난다!', '맞췄어! 불사조의 승리!'],
        'incorrect': ['틀렸어! 하지만 나는 다시 온다!', '오답! 다음에 다시 맞출 것이다!'],
        'timeout': ['시간 다 됐다! 나는 기다릴 수 있다!', '너무 느려! 나는 영원히 기다린다!'],
        'victory': ['이겼다! 하지만 나는 다시 올 것이다!', '승리! 내년에 다시 보자!'],
        'defeat': ['졌다! 하지만 나는 죽지 않는다!', '패배! 다음에 다시 도전한다!'],
        'combo': ['콤보! 나처럼 계속 돌아온다!', '계속 맞추네! 불사조처럼!'],
        'potion': ['물약 마셨구나! 나는 스스로 회복한다!', '회복! 나는 불사조니까!']
    },
    { // 18층 - 외계인 (재수없음)
        'welcome': ['지구인... 재수없게 왔구나...', '외계에서 왔다... 너희는 초보자...'],
        'battle_start': ['문제 풀어봐... 쉽지 않을 거다...', '시작한다... 지구인 수준이겠지...'],
        'correct': ['정답... 운이 좋았을 뿐...', '맞췄어... 다음은 틀릴 거다...'],
        'incorrect': ['틀렸어... 예상했지...', '오답... 지구인 수준...'],
        'timeout': ['시간 다 됐어... 느린 지구인...', '너무 느려... 외계인은 더 빠르다...'],
        'victory': ['이겼다... 운이 좋았을 뿐...', '승리... 다음 층 가라...'],
        'defeat': ['졌다... 지구인 주제에...', '패배... 재수없는 지구인...'],
        'combo': ['콤보... 운이 계속 좋구나...', '계속 맞추네... 이상하네...'],
        'potion': ['물약 마셨구나... 약한 지구인...', '회복... 필요할 때 마시는구나...']
    },
    { // 19층 - 뒤통수 머신 (뒤통수를 때림)
        'welcome': ['뒤통수 준비해라...', '조심해... 뒤통수 맞을 준비해...'],
        'battle_start': ['시작한다... 뒤통수 조심해...', '문제 풀어... 틀리면 뒤통수 맞아...'],
        'correct': ['정답... 다음엔 뒤통수 때린다...', '맞췄어... 일단 넘어가자...'],
        'incorrect': ['틀렸어... 뒤통수 때린다!', '오답... 준비해라!'],
        'timeout': ['시간 다 됐어... 뒤통수 맞을 시간!', '너무 느려... 뒤통수 한 대!'],
        'victory': ['이겼다... 뒤통수 때리지 않고 보내준다...', '승리... 다음 층으로...'],
        'defeat': ['졌다... 뒤통수 맞을 시간이다!', '패배... 뒤통수 때린다!'],
        'combo': ['콤보... 뒤통수 안 때린다...', '계속 맞추네... 뒤통수 때리기 아까워...'],
        'potion': ['물약 마셨구나... 뒤통수 치료제?', '회복... 뒤통수 때리기 전에...']
    },
    { // 20층 - 대마왕 (무시하고 비하)
        'welcome': ['흥... 또 지루한 도전자군...', '합격의 탑 최종보스... 나다...'],
        'battle_start': ['시작한다... 빨리 끝내자...', '문제 풀어... 너 따위가 풀 수 있을까...'],
        'correct': ['정답... 운이 좋았을 뿐...', '맞췄어... 다음은 틀릴 거다...'],
        'incorrect': ['틀렸어... 예상했지...', '오답... 너 따위가 맞출 수 있을까...'],
        'timeout': ['시간 다 됐어... 느린 자...', '너무 느려... 어리석은 자...'],
        'victory': ['이겼다... 대마왕을 이기다니...', '승리... 하지만 다음에 만나면...'],
        'defeat': ['졌다... 너 따위에게...', '패배... 수치다...'],
        'combo': ['콤보... 계속 운이 좋구나...', '계속 맞추네... 이상하네...'],
        'potion': ['물약 마셨구나... 약한 자의 습관...', '회복... 그래도 이기지 못할 거다...']
    }
];

// ==============================================
// 문제 유형 표시명 매핑
// ==============================================
const questionTypeNames = {
    '민법': '민법 문제',
    '특허법': '특허법 문제',
    '상표법': '상표법 문제',
    '디자인보호법': '디자인보호법 문제'
};

// ==============================================
// 데미지 타입 정의
// ==============================================
const DamageType = {
    HERO: 'hero',        // 영웅이 입은 데미지
    MONSTER: 'monster',  // 몬스터가 입은 데미지
    DODGE: 'dodge',      // 회피
    CRITICAL: 'critical', // 크리티컬
    POISON: 'poison',    // 독
    INVINCIBLE: 'invincible', // 무적
    HEAL: 'heal',        // 회복
    REGEN: 'regen'       // 몬스터 회복
};

// ==============================================
// 전역 상태 관리 변수 (확장)
// ==============================================
let gameState = {
    heroHP: 100,
    heroMaxHP: 100,
    monsterHP: 100,
    monsterMaxHP: 100,
    currentFloor: 1,
    combo: 0,
    potions: 3,
    isBattleActive: false,
    isGameStarted: false,
    isGameOver: false,
    isProcessing: false,
    currentQuestionType: '민법',
    currentQuestion: '',
    currentAnswer: '',
    timer: 10.0,
    timerInterval: null,
    monsterName: '진입 문지기',
    monsterDifficulty: '쉬움',
    speechTimeout: null,
    allQuestions: {},
    questionHistory: [],
    categoryRotation: [],
    currentCategoryIndex: 0,
    usedQuestions: {
        '민법': [],
        '특허법': [],
        '상표법': [],
        '디자인보호법': []
    },
    damageLog: [],
    
    // 새로운 상태 변수들
    isPoisoned: false,           // 독 상태 여부
    poisonTimer: 0,              // 독 지속 시간 (문제 수)
    isInvincible: false,         // 무적 상태 여부
    invincibleTimer: 0,          // 무적 지속 시간 (초)
    lastPoisonFloor: -1,         // 마지막으로 독에 걸린 층
    criticalMultiplier: 1.0,     // 크리티컬 배수
    dodgeActive: false,          // 회피 활성화
    regenActive: false,          // 체력회복 활성화
    specialEventActive: false,   // 특수 이벤트 활성화
    monsterIndex: 0,             // 현재 몬스터 인덱스 (0-19)
    
    // 방어막 관련 변수
    defenseActive: false,        // 방어막 활성화
    defenseType: '',             // 방어막 타입 (regen, invincible 등)
    defenseTimer: 0              // 방어막 지속 시간
};

// ==============================================
// 데미지 로그 추가
// ==============================================
function addDamageLog(type, amount, reason = '') {
    const logEntry = {
        type,
        amount,
        reason,
        timestamp: Date.now()
    };
    
    gameState.damageLog.unshift(logEntry);
    
    // 최대 5개만 유지
    if (gameState.damageLog.length > 5) {
        gameState.damageLog = gameState.damageLog.slice(0, 5);
    }
    
    // UI 업데이트
    updateDamageLog();
}

// ==============================================
// 데미지 로그 UI 업데이트
// ==============================================
function updateDamageLog() {
    const logContainer = document.getElementById('damage-log');
    if (!logContainer) return;
    
    // 로그 항목 생성
    let logHTML = '';
    gameState.damageLog.forEach(entry => {
        let logClass = '';
        let icon = '';
        let text = '';
        
        switch(entry.type) {
            case DamageType.HERO:
                logClass = 'hero-damage';
                icon = '💥';
                text = `영웅 데미지: -${entry.amount}`;
                if (entry.reason) text += ` (${entry.reason})`;
                break;
            case DamageType.MONSTER:
                logClass = 'monster-damage';
                icon = '🎯';
                text = `몬스터 데미지: -${entry.amount}`;
                if (entry.reason === 'critical') {
                    icon = '💥';
                    text = `크리티컬! -${entry.amount}`;
                }
                break;
            case DamageType.DODGE:
                logClass = 'dodge-effect';
                icon = '💨';
                text = '회피 성공!';
                break;
            case DamageType.POISON:
                logClass = 'poison-effect';
                icon = '☠️';
                text = '독 상태!';
                break;
            case DamageType.INVINCIBLE:
                logClass = 'invincible-effect';
                icon = '🛡️';
                text = '무적 상태!';
                break;
            case DamageType.HEAL:
                logClass = 'heal-effect';
                icon = '❤️';
                text = `회복: +${entry.amount}`;
                break;
            case DamageType.REGEN:
                logClass = 'regen-effect';
                icon = '✨';
                text = `몬스터 회복: +${entry.amount}`;
                break;
        }
        
        logHTML += `
            <div class="log-entry ${logClass}">
                <span class="log-icon">${icon}</span>
                <span class="log-text">${text}</span>
            </div>
        `;
    });
    
    logContainer.innerHTML = logHTML;
}

// ==============================================
// 데미지 로그 UI 생성 (위치 변경: 헤더 영역)
// ==============================================
function createDamageLogUI() {
    const damageLogContainer = document.querySelector('.damage-log-container');
    if (!damageLogContainer) return;
    
    // 이미 존재하면 제거
    const existingLog = document.getElementById('damage-log');
    if (existingLog) {
        existingLog.remove();
    }
    
    // 로그 컨테이너 생성
    const logContainer = document.createElement('div');
    logContainer.id = 'damage-log';
    logContainer.className = 'damage-log';
    
    // damage-log-container에 삽입
    damageLogContainer.appendChild(logContainer);
    
    updateDamageLog();
}


// ==============================================
// 데미지 팝업 표시 (타입별로 다른 위치/색상)
// ==============================================
function showDamagePopup(type, amount, reason = '') {
    let popupElement;
    let popupId;
    let position = { top: '-60px', left: '50%' };
    let fontSize = '4.5rem';
    let color = '#ff4444';
    let text = `-${amount}`;
    
    switch(type) {
        case DamageType.HERO:
            popupId = 'hero-damage-popup';
            popupElement = document.getElementById(popupId);
            if (!popupElement) {
                popupElement = createDamagePopup(popupId, '영웅');
            }
            position = { top: '20px', left: '50%' }; // 영웅 HP 바 위쪽
            color = '#ff6b6b';
            text = `영웅 -${amount}`;
            break;
            
        case DamageType.MONSTER:
            popupId = 'monster-damage-popup';
            popupElement = document.getElementById(popupId);
            if (!popupElement) {
                popupElement = createDamagePopup(popupId, '몬스터');
            }
            position = { top: '-60px', left: '50%' }; // 몬스터 HP 바 위쪽
            if (reason === 'critical') {
                color = '#ffd700';
                fontSize = '5.5rem';
                text = `CRITICAL! -${amount}`;
            } else {
                color = '#ff4444';
                text = `-${amount}`;
            }
            break;
            
        case DamageType.DODGE:
            popupId = 'dodge-popup';
            popupElement = document.getElementById(popupId);
            if (!popupElement) {
                popupElement = createDamagePopup(popupId, '회피');
            }
            position = { top: '50%', left: '50%' };
            color = '#4ecdc4';
            text = '회피!';
            break;
            
        case DamageType.POISON:
            popupId = 'poison-popup';
            popupElement = document.getElementById(popupId);
            if (!popupElement) {
                popupElement = createDamagePopup(popupId, '독');
            }
            position = { top: '30px', left: '30px' }; // 독 효과는 왼쪽 상단
            color = '#00cc44';
            text = '☠️ 독!';
            break;
            
        case DamageType.INVINCIBLE:
            popupId = 'invincible-popup';
            popupElement = document.getElementById(popupId);
            if (!popupElement) {
                popupElement = createDamagePopup(popupId, '무적');
            }
            position = { top: '50%', left: '50%' };
            color = '#a855f7';
            text = '무적!';
            break;
            
        case DamageType.HEAL:
            popupId = 'heal-popup';
            popupElement = document.getElementById(popupId);
            if (!popupElement) {
                popupElement = createDamagePopup(popupId, '회복');
            }
            position = { top: '20px', left: '50%' };
            color = '#4ecdc4';
            text = `+${amount}`;
            break;
            
        case DamageType.REGEN:
            popupId = 'regen-popup';
            popupElement = document.getElementById(popupId);
            if (!popupElement) {
                popupElement = createDamagePopup(popupId, '회복');
            }
            position = { top: '-30px', left: '50%' };
            color = '#00cc44';
            text = `회복 +${amount}`;
            break;
    }
    
    if (!popupElement) return;
    
    // 데미지 로그에 추가
    addDamageLog(type, amount, reason);
    
    // 팝업 설정
    popupElement.textContent = text;
    popupElement.style.color = color;
    popupElement.style.fontSize = fontSize;
    popupElement.style.top = position.top;
    popupElement.style.left = position.left;
    popupElement.style.transform = 'translateX(-50%)';
    
    // 애니메이션 적용
    popupElement.style.opacity = '0';
    popupElement.style.animation = 'none';
    
    setTimeout(() => {
        popupElement.style.opacity = '1';
        popupElement.style.animation = 'damagePopup 1.5s ease-out forwards';
    }, 10);
    
    // 1.5초 후 자동 제거
    setTimeout(() => {
        popupElement.style.opacity = '0';
    }, 1500);
}

// ==============================================
// 데미지 팝업 생성
// ==============================================
function createDamagePopup(id, label) {
    // 이미 존재하면 반환
    let popup = document.getElementById(id);
    if (popup) return popup;
    
    popup = document.createElement('div');
    popup.id = id;
    popup.className = 'damage-popup';
    popup.dataset.label = label;
    
    popup.style.cssText = `
        position: absolute;
        font-family: 'Gugi', cursive;
        font-weight: bold;
        opacity: 0;
        pointer-events: none;
        z-index: 1000;
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
        white-space: nowrap;
    `;
    
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.appendChild(popup);
    }
    
    return popup;
}

// ==============================================
// 독 효과 표시 (수정됨)
// ==============================================
function showPoisonEffect() {
    // 독 오버레이 표시
    const poisonOverlay = document.getElementById('poison-overlay');
    if (poisonOverlay) {
        poisonOverlay.style.display = 'block';
        poisonOverlay.style.opacity = '0';
        poisonOverlay.style.animation = 'none';
        
        setTimeout(() => {
            poisonOverlay.style.opacity = '0.3';
            poisonOverlay.style.animation = 'poisonEffect 0.5s ease-out forwards';
        }, 10);
    }
    
    // 독 상태 표시 업데이트
    updateStatusEffects();
    
    // 독 데미지 팝업
    showDamagePopup(DamageType.POISON, 0);
}

// ==============================================
// 영웅 데미지 처리 - 로그 중복 제거
// ==============================================
function heroTakeDamage() {
    const monsterInfo = monsterInfos[Math.min(gameState.currentFloor - 1, 19)];
    
    // 기본 데미지 계산
    let damage = Math.floor(15 + (gameState.currentFloor - 1) * 2);
    
    // 콤보가 끊겼으므로 0으로 초기화
    gameState.combo = 0;
    
    // 영웅에게 데미지 적용
    gameState.heroHP -= damage;
    
    // 데미지 팝업 표시 (데미지 로그는 여기서만 처리)
    showDamagePopup(DamageType.HERO, damage);
    
    if (gameState.heroHP < 0) {
        gameState.heroHP = 0;
        gameOver();
    }
    
    // 화면 흔들림 효과
    screenShake('hero');
    
    updateUI();
}



// ==============================================
// 기하급수적 체력 증가 계산 함수
// ==============================================
function calculateMonsterHP(floor) {
    const monsterInfo = monsterInfos[Math.min(floor - 1, 19)];
    const baseHP = monsterInfo.baseHP;
    
    // 기하급수적 증가: 1층에서 20층까지 체력이 크게 증가
    // 지수 증가 공식: 체력 = baseHP * e^(0.12*(floor-1))
    // 1층: baseHP, 20층: baseHP * e^(0.12*19) = baseHP * e^2.28 ≈ baseHP * 9.77
    const exponent = 0.12 * (floor - 1);
    const exponentialHP = Math.floor(baseHP * Math.exp(exponent));
    
    // 최종 보스는 100문제 필요 (평균 데미지 30 가정)
    if (floor === 20) {
        return 3000;
    }
    
    return exponentialHP;
}

// ==============================================
// 영웅 데미지 계산 (층수에 따라 증가)
// ==============================================
function calculateHeroDamage() {
    // 기하급수적 데미지 증가: 초반에는 적게, 후반에는 많이
    // 1층: 15, 20층: 45 (3배 증가)
    const baseDamage = 15;
    const maxDamage = 45;
    
    // 지수 증가: 1층에서 20층까지 서서히 증가
    // 공식: 데미지 = baseDamage * (1 + (floor-1)/19 * 2)
    const floor = gameState.currentFloor;
    const damageMultiplier = 1 + ((floor - 1) / 19) * 2;
    const calculatedDamage = Math.floor(baseDamage * damageMultiplier);
    
    return Math.min(calculatedDamage, maxDamage);
}

// ==============================================
// 몬스터 상태 초기화 시 독 효과 제거
// ==============================================
function updateMonsterStats() {
    const floor = gameState.currentFloor;
    const monsterInfo = monsterInfos[Math.min(floor - 1, 19)];
    
    // 체력 업데이트 (기하급수적 증가 적용)
    gameState.monsterMaxHP = calculateMonsterHP(floor);
    gameState.monsterHP = gameState.monsterMaxHP;
    
    // 이름과 이모지 업데이트
    gameState.monsterName = monsterInfo.name;
    gameState.monsterIndex = Math.min(floor - 1, 19);
    
    // 난이도 업데이트
    if (floor <= 5) {
        gameState.monsterDifficulty = '쉬움';
    } else if (floor <= 10) {
        gameState.monsterDifficulty = '보통';
    } else if (floor <= 15) {
        gameState.monsterDifficulty = '어려움';
    } else if (floor <= 19) {
        gameState.monsterDifficulty = '극악';
    } else {
        gameState.monsterDifficulty = '최종보스';
    }
    
    // 이모지 업데이트
    const monsterEmoji = document.getElementById('monster-emoji');
    if (monsterEmoji) {
        monsterEmoji.textContent = monsterInfo.emoji;
    }
    
    // 상태 효과 초기화
    gameState.isPoisoned = false;
    gameState.poisonTimer = 0;
    gameState.isInvincible = false;
    gameState.invincibleTimer = 0;
    gameState.dodgeActive = false;
    gameState.regenActive = false;
    gameState.specialEventActive = false;
    gameState.defenseActive = false;
    gameState.defenseType = '';
    gameState.defenseTimer = 0;
    
    // 상태 효과 UI 업데이트 (독 상태 초기화 포함)
    updateStatusEffects();
    
    // 독 오버레이 숨기기
    const poisonOverlay = document.getElementById('poison-overlay');
    if (poisonOverlay) {
        poisonOverlay.style.display = 'none';
        poisonOverlay.style.animation = 'none';
    }
}

// ==============================================
// 상태 효과 UI 업데이트 (수정됨)
// ==============================================
function updateStatusEffects() {
    // 독 상태 UI 업데이트
    const poisonStatus = document.getElementById('poison-status');
    const poisonTimerElement = document.getElementById('poison-timer');
    const poisonOverlay = document.getElementById('poison-overlay');
    
    if (poisonStatus && poisonTimerElement) {
        if (gameState.isPoisoned && gameState.poisonTimer > 0) {
            // 독 상태 활성화
            poisonStatus.style.display = 'flex';
            poisonTimerElement.textContent = ""; // 빈 문자열로 설정

            
            // 독 오버레이 표시
            if (poisonOverlay) {
                poisonOverlay.style.display = 'block';
                poisonOverlay.style.animation = 'poisonOverlayPulse 1s infinite alternate';
            }
            
            // 타이머에 독 효과 표시
            const timerText = document.getElementById('timer-text');
            if (timerText) {
                timerText.innerHTML = `${gameState.timer.toFixed(1)} <span class="poison-indicator">(독)</span>`;
            }
        } else {
            // 독 상태 비활성화
            poisonStatus.style.display = 'none';
            
            // 독 오버레이 숨기기
            if (poisonOverlay) {
                poisonOverlay.style.display = 'none';
                poisonOverlay.style.animation = 'none';
            }
            
            // 타이머에서 독 효과 제거
            const timerText = document.getElementById('timer-text');
            if (timerText) {
                timerText.textContent = gameState.timer.toFixed(1);
            }
        }
    }
    
    // 몬스터 상태 UI 업데이트 (무적, 회복)
    const invincibleStatus = document.getElementById('invincible-status');
    const regenStatus = document.getElementById('regen-status');
    
    if (invincibleStatus) {
        invincibleStatus.style.display = gameState.isInvincible ? 'flex' : 'none';
    }
    if (regenStatus) {
        regenStatus.style.display = gameState.regenActive ? 'flex' : 'none';
    }
}

// ==============================================
// 방어 효과 표시 (회복, 무적, 회피)
// ==============================================
function showDefenseEffect(type) {
    gameState.defenseActive = true;
    gameState.defenseType = type;
    gameState.defenseTimer = type === 'invincible' ? 5 : 2; // 무적: 5초, 그 외: 2초
    
    const defenseEffect = document.createElement('div');
    defenseEffect.className = `defense-effect ${type}-defense`;
    
    let html = '';
    let styles = '';
    
    switch(type) {
        case 'regen':
            html = '🛡️<br>방어 중... 회복 준비!';
            styles = `
                background: rgba(0, 204, 68, 0.3);
                border: 3px solid #00cc44;
                color: #00cc44;
                font-size: 1.8rem;
            `;
            break;
        case 'invincible':
            html = '✝<br>무적 상태!';
            styles = `
                background: rgba(168, 85, 247, 0.3);
                border: 3px solid #a855f7;
                color: #a855f7;
                font-size: 2rem;
            `;
            break;
        case 'dodge':
            html = '💨<br>회피 준비!';
            styles = `
                background: rgba(78, 205, 196, 0.3);
                border: 3px solid #4ecdc4;
                color: #4ecdc4;
                font-size: 1.8rem;
            `;
            break;
    }
    
    defenseEffect.innerHTML = html;
    defenseEffect.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px 30px;
        border-radius: 20px;
        font-weight: bold;
        text-align: center;
        z-index: 100;
        pointer-events: none;
        animation: defensePopup ${gameState.defenseTimer}s ease-out forwards;
        box-shadow: 0 0 30px currentColor;
        ${styles}
    `;
    
    const monsterSection = document.querySelector('.monster-section');
    if (monsterSection) {
        monsterSection.appendChild(defenseEffect);
        
        // 지속 시간 후 제거
        setTimeout(() => {
            if (defenseEffect.parentNode) {
                defenseEffect.remove();
            }
            gameState.defenseActive = false;
            gameState.defenseType = '';
            gameState.defenseTimer = 0;
        }, gameState.defenseTimer * 1000);
    }
}

// ==============================================
// 몬스터 회복 효과 (방어막과 함께)
// ==============================================
function triggerMonsterRegen() {
    const floorIndex = gameState.monsterIndex;
    const monsterInfo = monsterInfos[floorIndex];
    
    if (Math.random() < monsterInfo.regenChance && !gameState.regenActive && !gameState.defenseActive) {
        gameState.regenActive = true;
        
        // 1. 방어막 표시
        showDefenseEffect('regen');
        
        // 2. 2초 후 체력 회복
        setTimeout(() => {
            if (gameState.isBattleActive && gameState.regenActive) {
                const regenAmount = Math.floor(gameState.monsterMaxHP * 0.15); // 15% 회복
                const oldHP = gameState.monsterHP;
                gameState.monsterHP = Math.min(gameState.monsterMaxHP, gameState.monsterHP + regenAmount);
                const actualRegen = gameState.monsterHP - oldHP;
                
                if (actualRegen > 0) {
                    // 회복 수치 표시
                    showRegenEffect(actualRegen);
                    showMonsterDialog('correct');
                    
                    // 회복 효과음
                    playSound('correct-sound', 0.5);
                }
                
                gameState.regenActive = false;
                updateUI();
            }
        }, 2000);
        
        return true;
    }
    
    return false;
}

// ==============================================
// 무적 상태 활성화
// ==============================================
function triggerInvincibility() {
    const floor = gameState.currentFloor;
    
    // 15층 이상에서만 무적 발동
    if (floor >= 15 && Math.random() < 0.15 && !gameState.isInvincible && !gameState.defenseActive) {
        gameState.isInvincible = true;
        gameState.invincibleTimer = 5; // 5초 무적
        
        // 무적 효과 표시
        showDefenseEffect('invincible');
        showInvincibleCross();
        
        // 무적 타이머 시작
        const invincibleInterval = setInterval(() => {
            if (gameState.isInvincible && gameState.invincibleTimer > 0) {
                gameState.invincibleTimer--;
                if (gameState.invincibleTimer <= 0) {
                    gameState.isInvincible = false;
                    clearInterval(invincibleInterval);
                    updateStatusEffects();
                }
            } else {
                clearInterval(invincibleInterval);
            }
        }, 1000);
        
        return true;
    }
    
    return false;
}

// ==============================================
// 무적 십자가 표시
// ==============================================
function showInvincibleCross() {
    const crossElement = document.createElement('div');
    crossElement.className = 'invincible-cross';
    crossElement.innerHTML = '✝';
    
    crossElement.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 12rem;
        color: rgba(168, 85, 247, 0.7);
        z-index: 95;
        pointer-events: none;
        animation: crossGlow 1s infinite alternate;
        text-shadow: 0 0 30px rgba(168, 85, 247, 0.9);
    `;
    
    const monsterVisual = document.querySelector('.monster-visual');
    if (monsterVisual) {
        monsterVisual.appendChild(crossElement);
        
        // 5초 후 제거
        setTimeout(() => {
            if (crossElement.parentNode) {
                crossElement.remove();
            }
        }, 5000);
    }
}

// ==============================================
// 회복 효과 표시
// ==============================================
function showRegenEffect(amount) {
    const regenPopup = document.createElement('div');
    regenPopup.className = 'regen-popup';
    regenPopup.textContent = `+${amount}`;
    
    regenPopup.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Gugi', cursive;
        font-size: 3.5rem;
        color: #00cc44;
        text-shadow: 
            2px 2px 0 rgba(0, 0, 0, 0.8),
            0 0 25px rgba(0, 204, 68, 0.9),
            0 0 50px rgba(0, 204, 68, 0.7);
        opacity: 0;
        pointer-events: none;
        z-index: 100;
        font-weight: bold;
        animation: regenPopup 1.5s ease-out forwards;
    `;
    
    const monsterSection = document.querySelector('.monster-section');
    if (monsterSection) {
        monsterSection.appendChild(regenPopup);
        
        // 1.5초 후 제거
        setTimeout(() => {
            if (regenPopup.parentNode) {
                regenPopup.remove();
            }
        }, 1500);
    }
}

// ==============================================
// 배열 셔플 함수
// ==============================================
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ==============================================
// 카테고리 순환 배열 초기화
// ==============================================
function initializeCategoryRotation() {
    const categories = Object.keys(gameState.allQuestions).filter(cat => 
        gameState.allQuestions[cat] && gameState.allQuestions[cat].length > 0
    );
    
    if (categories.length === 0) return;
    
    // 난이도에 따른 카테고리 구성
    if (gameState.currentFloor <= 5) {
        gameState.categoryRotation = ['민법', '민법', '민법', '민법'];
    } else if (gameState.currentFloor <= 10) {
        gameState.categoryRotation = ['민법', '민법', '특허법', '상표법'];
    } else if (gameState.currentFloor <= 15) {
        gameState.categoryRotation = categories;
    } else {
        const expandedRotation = [];
        for (let i = 0; i < 3; i++) {
            expandedRotation.push(...categories);
        }
        gameState.categoryRotation = expandedRotation;
    }
    
    // 카테고리가 없는 경우 방지
    gameState.categoryRotation = gameState.categoryRotation.filter(cat => 
        categories.includes(cat)
    );
    
    // 순환 배열 섞기
    gameState.categoryRotation = shuffleArray(gameState.categoryRotation);
    gameState.currentCategoryIndex = 0;
}

// ==============================================
// 사용 가능한 문제 찾기
// ==============================================
function getAvailableQuestion(category) {
    const allQuestions = gameState.allQuestions[category] || [];
    const usedQuestions = gameState.usedQuestions[category] || [];
    
    // 사용되지 않은 문제 찾기
    const unusedQuestions = allQuestions.filter((q, index) => !usedQuestions.includes(index));
    
    if (unusedQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
        const question = unusedQuestions[randomIndex];
        const actualIndex = allQuestions.findIndex(q => q.question === question.question);
        
        gameState.usedQuestions[category].push(actualIndex);
        return question;
    } else {
        // 모든 문제를 다 사용했으면 기록 초기화
        console.log(`${category} 카테고리의 모든 문제를 사용했습니다. 기록을 초기화합니다.`);
        gameState.usedQuestions[category] = [];
        
        if (allQuestions.length > 0) {
            const question = allQuestions[0];
            gameState.usedQuestions[category].push(0);
            return question;
        }
        
        return null;
    }
}

// ==============================================
// 게임 초기화 함수 수정 (콘솔 로그 추가)
// ==============================================
async function initSimpleGame() {
    console.log('게임 초기화 시작');
    
    // 이벤트 리스너 설정 (먼저 실행)
    setupEventListeners();
    
    // 1. 화면 초기화
    document.getElementById('start-section').style.display = 'flex';
    document.getElementById('ox-answers').style.display = 'none';
    document.getElementById('input-answers').style.display = 'none';
    document.getElementById('question-text').textContent = '합격의 탑을 시작하려면 아래 버튼을 클릭하세요!';
    document.getElementById('result-screen').style.display = 'none';
    
    // 2. 기존 데미지 팝업들 제거
    const popups = ['hero-damage-popup', 'monster-damage-popup', 'dodge-popup', 
                    'poison-popup', 'invincible-popup', 'heal-popup', 'regen-popup'];
    popups.forEach(id => {
        const popup = document.getElementById(id);
        if (popup) popup.remove();
    });
    
    // 3. 게임 상태 초기화
    gameState = {
        heroHP: 100,
        heroMaxHP: 100,
        monsterHP: 100,
        monsterMaxHP: 100,
        currentFloor: 1,
        combo: 0,
        potions: 3,
        isBattleActive: false,
        isGameStarted: false,
        isGameOver: false,
        isProcessing: false,
        currentQuestionType: '민법',
        currentQuestion: '',
        currentAnswer: '',
        timer: 10.0,
        timerInterval: null,
        monsterName: '진입 문지기',
        monsterDifficulty: '쉬움',
        speechTimeout: null,
        allQuestions: {},
        questionHistory: [],
        categoryRotation: [],
        currentCategoryIndex: 0,
        usedQuestions: {
            '민법': [],
            '특허법': [],
            '상표법': [],
            '디자인보호법': []
        },
        damageLog: [],
        isPoisoned: false,
        poisonTimer: 0,
        isInvincible: false,
        invincibleTimer: 0,
        lastPoisonFloor: -1,
        criticalMultiplier: 1.0,
        dodgeActive: false,
        regenActive: false,
        specialEventActive: false,
        monsterIndex: 0,
        defenseActive: false,
        defenseType: '',
        defenseTimer: 0
    };
    
    // 4. 타이머 정리
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    // 5. 문제 데이터 로드
    try {
        if (typeof questionsData !== 'undefined') {
            gameState.allQuestions = questionsData;
            delete gameState.allQuestions['자연과학'];
            
            const categories = Object.keys(gameState.allQuestions);
            console.log(`로드된 카테고리: ${categories.join(', ')}`);
            
            for (const category of categories) {
                const count = gameState.allQuestions[category]?.length || 0;
                console.log(`${category}: ${count}개 문제`);
                
                if (count === 0) {
                    gameState.allQuestions[category] = [
                        { question: `${category} 문제 예시 - 정답은 O입니다`, answer: "O" },
                        { question: `${category} 문제 예시 - 정답은 X입니다`, answer: "X" }
                    ];
                }
                
                if (!gameState.usedQuestions[category]) {
                    gameState.usedQuestions[category] = [];
                }
            }
        } else {
            throw new Error('questionsData가 정의되지 않았습니다.');
        }
    } catch (error) {
        console.error('문제 데이터 로드 실패:', error);
        gameState.allQuestions = {
            '민법': [],
            '특허법': [],
            '상표법': [],
            '디자인보호법': []
        };
        
        for (const category in gameState.allQuestions) {
            gameState.allQuestions[category] = [
                { question: `${category} 기본 문제 - 정답은 O입니다`, answer: "O" },
                { question: `${category} 기본 문제 - 정답은 X입니다`, answer: "X" }
            ];
            gameState.usedQuestions[category] = [];
        }
    }
    
    // 6. 몬스터 정보 초기화
    updateMonsterStats();
    
    // 7. 카테고리 순환 배열 초기화
    initializeCategoryRotation();
    
    // 8. 데미지 로그 UI 생성
    createDamageLogUI();
    
    // 9. UI 업데이트
    updateUI();
    
    console.log('게임 초기화 완료');
    console.log('OX 버튼:', document.querySelectorAll('.answer-btn').length, '개 발견');
}

// ==============================================
// 이벤트 리스너 설정 함수 (수정)
// ==============================================
function setupEventListeners() {
    console.log('이벤트 리스너 설정 시작');
    
    // 시작 버튼
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
        startBtn.onclick = function(e) {
            console.log('시작 버튼 클릭됨!');
            e.stopPropagation();
            forceStartGame();
        };
    }
    
    // OX 버튼 - 클래스를 '.answer-btn'으로 수정
    const oxButtons = document.querySelectorAll('.answer-btn');
    console.log(`OX 버튼 찾음: ${oxButtons.length}개`);
    oxButtons.forEach(btn => {
        btn.onclick = function() {
            console.log('OX 버튼 클릭됨:', this.getAttribute('data-answer'));
            if (!gameState.isProcessing && gameState.isBattleActive) {
                const answer = this.getAttribute('data-answer');
                submitAnswer(answer);
            }
        };
    });
    
    // 포션 버튼
    const potionBtn = document.getElementById('mini-potion-btn');
    if (potionBtn) {
        potionBtn.onclick = usePotion;
    }
    
    // 결과 버튼
    const resultBtn = document.getElementById('result-btn');
    const retryBtn = document.getElementById('retry-btn');
    if (resultBtn) resultBtn.onclick = nextFloor;
    if (retryBtn) retryBtn.onclick = retryGame;
    
    // 답변 입력 필드 엔터 키 이벤트
    const answerInput = document.getElementById('answer-input');
    if (answerInput) {
        answerInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitInputAnswer();
            }
        });
    }
}


// ==============================================
// 강제로 게임 시작하는 함수
// ==============================================
async function forceStartGame() {
    console.log('강제 게임 시작!');
    
    // 이미 처리 중이면 무시
    if (gameState.isProcessing) return;
    
    gameState.isProcessing = true;
    
    try {
        // 1. 타이머 정리
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
        }
        
        // 2. 게임 상태 설정
        gameState.isGameStarted = true;
        gameState.isBattleActive = true;
        gameState.isGameOver = false;
        
        // 3. 시작 화면 숨기기
        document.getElementById('start-section').style.display = 'none';
        
        // 4. UI 업데이트
        updateUI();
        
        // 5. 몬스터 대사 표시
        showMonsterDialog('welcome', 2000);
        
        // 6. 바로 첫 문제 출제
        setTimeout(() => {
            gameState.isProcessing = false;
            generateNewQuestion();
        }, 1000);
        
        console.log('게임 시작 완료!');
    } catch (error) {
        console.error('게임 시작 오류:', error);
        gameState.isProcessing = false;
    }
}

// ==============================================
// UI 업데이트
// ==============================================
function updateUI() {
    // HP 업데이트
    const heroHpPercent = (gameState.heroHP / gameState.heroMaxHP) * 100;
    const heroHpBar = document.getElementById('hero-hp-bar');
    if (heroHpBar) heroHpBar.style.width = `${heroHpPercent}%`;
    
    const heroHpText = document.getElementById('hero-hp-text');
    if (heroHpText) heroHpText.textContent = `${gameState.heroHP} / ${gameState.heroMaxHP}`;
    
    const monsterHpPercent = (gameState.monsterHP / gameState.monsterMaxHP) * 100;
    const monsterHpBar = document.getElementById('monster-hp-bar');
    if (monsterHpBar) monsterHpBar.style.width = `${monsterHpPercent}%`;
    
    const monsterHpText = document.getElementById('monster-hp-text');
    if (monsterHpText) monsterHpText.textContent = `${gameState.monsterHP} / ${gameState.monsterMaxHP}`;
    
    // 기타 정보 업데이트
    const currentFloor = document.getElementById('current-floor');
    if (currentFloor) currentFloor.textContent = gameState.currentFloor;
    
    const comboCount = document.getElementById('combo-count');
    if (comboCount) {
        comboCount.textContent = gameState.combo;
        if (gameState.combo >= 3) {
            comboCount.style.color = '#ff4444';
            comboCount.style.textShadow = '0 0 15px rgba(255, 68, 68, 0.8)';
        } else {
            comboCount.style.color = '#ffd700';
            comboCount.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.7)';
        }
    }
    
    const potionNumber = document.getElementById('potion-number');
    if (potionNumber) potionNumber.textContent = gameState.potions;
    
    const miniPotionCount = document.getElementById('mini-potion-count');
    if (miniPotionCount) miniPotionCount.textContent = gameState.potions;
    
    const monsterName = document.getElementById('monster-name');
    if (monsterName) monsterName.textContent = gameState.monsterName;
    
    const monsterLevel = document.getElementById('monster-level');
    if (monsterLevel) monsterLevel.textContent = gameState.monsterDifficulty;
    
    // 난이도에 따른 몬스터 섹션 클래스 업데이트
    const monsterSection = document.querySelector('.monster-section');
    if (monsterSection) {
        monsterSection.className = 'monster-section';
        
        if (gameState.currentFloor <= 5) {
            monsterSection.classList.add('difficulty-easy');
        } else if (gameState.currentFloor <= 10) {
            monsterSection.classList.add('difficulty-medium');
        } else if (gameState.currentFloor <= 15) {
            monsterSection.classList.add('difficulty-hard');
        } else if (gameState.currentFloor <= 19) {
            monsterSection.classList.add('difficulty-extreme');
        } else {
            monsterSection.classList.add('difficulty-boss');
        }
    }
    
    // 상태 효과 UI 업데이트
    updateStatusEffects();
}

// ==============================================
// 문지기 대화 표시 (층별 대사 적용)
// ==============================================
function showMonsterDialog(type, duration = 3000) {
    const speechBubble = document.getElementById('monster-speech');
    const speechText = speechBubble?.querySelector('.speech-text');
    
    // 현재 층에 맞는 대사 가져오기 (인덱스는 0부터 시작하므로 floor-1)
    const floorIndex = Math.min(gameState.currentFloor - 1, 19);
    const dialogs = monsterDialogsByFloor[floorIndex][type];
    
    if (!dialogs || !speechBubble || !speechText || dialogs.length === 0) return;
    
    const randomDialog = dialogs[Math.floor(Math.random() * dialogs.length)];
    
    // 이전 타임아웃 정리
    if (gameState.speechTimeout) {
        clearTimeout(gameState.speechTimeout);
    }
    
    // 말풍선 숨기기
    speechBubble.classList.remove('show');
    
    setTimeout(() => {
        speechText.textContent = randomDialog;
        speechBubble.classList.add('show');
        
        // 설정된 시간 후 사라짐
        gameState.speechTimeout = setTimeout(() => {
            speechBubble.classList.remove('show');
        }, duration);
    }, 300);
}

// ==============================================
// 새 문제 생성 (독 효과 처리 수정)
// ==============================================
function generateNewQuestion() {
    // 처리 중이면 무시
    if (gameState.isProcessing) return;
    
    gameState.isProcessing = true;
    
    // 타이머 정리
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    // 독 효과 처리
    if (gameState.isPoisoned && gameState.poisonTimer > 0) {
        gameState.poisonTimer--;
        if (gameState.poisonTimer <= 0) {
            gameState.isPoisoned = false;
            updateStatusEffects(); // 수정됨: 독 상태 UI 업데이트
        }
    }
    
    // 독 상태가 여전히 활성화되어 있다면 UI 업데이트
    if (gameState.isPoisoned) {
        updateStatusEffects();
    }
    
    // 무적 상태 처리
    if (gameState.isInvincible && gameState.invincibleTimer > 0) {
        gameState.invincibleTimer--;
        if (gameState.invincibleTimer <= 0) {
            gameState.isInvincible = false;
            updateStatusEffects();
        }
    }
    
    // 몬스터 자동 이벤트 체크 (문제 생성 시)
    // 회복이나 무적은 문제 풀이 전에 발생할 수 있음
    if (!gameState.defenseActive) {
        // 회복 체크 (25% 확률로 회복 시도)
        if (Math.random() < 0.25) {
            triggerMonsterRegen();
        }
        
        // 무적 체크 (15층 이상에서 10% 확률)
        if (gameState.currentFloor >= 15 && Math.random() < 0.10) {
            triggerInvincibility();
        }
    }
    
    // 사용 가능한 카테고리 확인
    const availableCategories = Object.keys(gameState.allQuestions).filter(
        category => gameState.allQuestions[category] && gameState.allQuestions[category].length > 0
    );
    
    if (availableCategories.length === 0) {
        console.error('사용 가능한 문제 카테고리가 없습니다.');
        const questionText = document.getElementById('question-text');
        if (questionText) questionText.textContent = '문제 데이터가 없습니다. questions.js 파일을 확인해주세요.';
        gameState.isProcessing = false;
        return;
    }
    
    // 현재 순환 배열이 비어있으면 재초기화
    if (gameState.categoryRotation.length === 0) {
        initializeCategoryRotation();
    }
    
    // 순환 방식으로 카테고리 선택
    let selectedCategory = gameState.categoryRotation[gameState.currentCategoryIndex];
    
    // 선택된 카테고리에 문제가 없으면 다음 카테고리로
    if (!gameState.allQuestions[selectedCategory] || gameState.allQuestions[selectedCategory].length === 0) {
        gameState.currentCategoryIndex = (gameState.currentCategoryIndex + 1) % gameState.categoryRotation.length;
        selectedCategory = gameState.categoryRotation[gameState.currentCategoryIndex];
    }
    
    // 사용 가능한 문제 가져오기
    let questionData = getAvailableQuestion(selectedCategory);
    
    if (!questionData) {
        // 문제를 찾을 수 없으면 다음 카테고리로
        gameState.currentCategoryIndex = (gameState.currentCategoryIndex + 1) % gameState.categoryRotation.length;
        selectedCategory = gameState.categoryRotation[gameState.currentCategoryIndex];
        
        // 재귀적으로 다시 시도 (최대 3회)
        for (let i = 0; i < 3; i++) {
            const nextQuestion = getAvailableQuestion(selectedCategory);
            if (nextQuestion) {
                questionData = nextQuestion;
                break;
            }
            gameState.currentCategoryIndex = (gameState.currentCategoryIndex + 1) % gameState.categoryRotation.length;
            selectedCategory = gameState.categoryRotation[gameState.currentCategoryIndex];
        }
        
        if (!questionData) {
            const questionText = document.getElementById('question-text');
            if (questionText) questionText.textContent = '문제를 불러올 수 없습니다.';
            gameState.isProcessing = false;
            return;
        }
    }
    
    // 상태 업데이트
    gameState.currentQuestionType = selectedCategory;
    gameState.currentQuestion = questionData.question;
    gameState.currentAnswer = questionData.answer;
    
    // 문제 기록에 추가
    gameState.questionHistory.push({
        category: selectedCategory,
        question: questionData.question,
        floor: gameState.currentFloor,
        timestamp: Date.now()
    });
    
    // 최근 50개 문제만 유지
    if (gameState.questionHistory.length > 50) {
        gameState.questionHistory = gameState.questionHistory.slice(-50);
    }
    
    // 다음 카테고리로 이동
    gameState.currentCategoryIndex = (gameState.currentCategoryIndex + 1) % gameState.categoryRotation.length;
    
    // UI 업데이트
    const questionType = document.getElementById('question-type');
    if (questionType) questionType.textContent = questionTypeNames[selectedCategory] || selectedCategory;
    
    const questionText = document.getElementById('question-text');
    if (questionText) {
        questionText.textContent = gameState.currentQuestion;
        adjustFontSize(questionText);
    }
    
    // 문제 박스 스크롤 맨 위로 이동
    const questionBox = document.querySelector('.question-box');
    if (questionBox) questionBox.scrollTop = 0;
    
    // OX 답변 UI만 표시
    const oxAnswers = document.getElementById('ox-answers');
    if (oxAnswers) oxAnswers.style.display = 'flex';
    
    const inputAnswers = document.getElementById('input-answers');
    if (inputAnswers) inputAnswers.style.display = 'none';
    
    // 타이머 시작 (독 효과 적용)
    startTimer();
    
    // 처리 완료
    gameState.isProcessing = false;
    
    console.log(`출제 카테고리: ${selectedCategory}`);
}

// ==============================================
// 폰트 크기 조정 함수
// ==============================================
function adjustFontSize(element) {
    const textLength = element.textContent.length;
    
    // 모든 폰트 크기 클래스 제거
    element.classList.remove('long-text', 'very-long-text', 'extremely-long-text', 'super-long-text');
    
    // 길이에 따른 클래스 추가
    if (textLength > 80 && textLength <= 120) {
        element.classList.add('long-text');
    } else if (textLength > 120 && textLength <= 180) {
        element.classList.add('very-long-text');
    } else if (textLength > 180 && textLength <= 250) {
        element.classList.add('extremely-long-text');
    } else if (textLength > 250) {
        element.classList.add('super-long-text');
        showScrollHint();
    }
}

// ==============================================
// 스크롤 힌트 표시 함수
// ==============================================
function showScrollHint() {
    const hint = document.querySelector('.scroll-hint');
    if (hint) {
        hint.style.display = 'flex';
        
        // 5초 후 힌트 제거
        setTimeout(() => {
            hint.style.display = 'none';
        }, 5000);
    }
}

// ==============================================
// 타이머 시작 (독 효과 적용)
// ==============================================
function startTimer() {
    // 기존 타이머 정리
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    // 문제 길이에 따라 타이머 시간 설정
    let baseTime = 10.0;
    if (gameState.currentQuestion) {
        const textLength = gameState.currentQuestion.length;
        if (textLength >= 100) {
            baseTime = 15.0;
        } else if (textLength >= 50) {
            baseTime = 13.0;
        }
    }
    
    // 독 효과 적용 (-2초)
    if (gameState.isPoisoned) {
        baseTime = Math.max(3.0, baseTime - 2.0); // 최소 3초 보장
    }
    
    gameState.timer = baseTime;
    updateTimerDisplay();
    
    gameState.timerInterval = setInterval(() => {
        gameState.timer -= 0.1;
        
        if (gameState.timer <= 0) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
            timeOut();
        } else {
            updateTimerDisplay();
        }
    }, 100);
}

// ==============================================
// 타이머 업데이트 (독 효과 표시 제거)
// ==============================================
function updateTimerDisplay() {
    const timerText = document.getElementById('timer-text');
    if (!timerText) return;
    
    const timerCircle = document.querySelector('.timer-circle');
    if (!timerCircle) return;
    
    let baseTime = 10.0;
    if (gameState.currentQuestion) {
        const textLength = gameState.currentQuestion.length;
        if (textLength >= 100) {
            baseTime = 15.0;
        } else if (textLength >= 50) {
            baseTime = 13.0;
        }
    }
    
    // 독 효과 적용 (표시는 독 상태 UI에서만)
    if (gameState.isPoisoned) {
        baseTime = Math.max(3.0, baseTime - 2.0);
    }
    
    // 독 효과가 있더라도 타이머 텍스트는 숫자만 표시
    timerText.textContent = gameState.timer.toFixed(1);
    
    const percent = gameState.timer / baseTime;
    
    // 타이머 색상 및 효과 변화
    if (gameState.isPoisoned) {
        // 독 상태일 때는 녹색 계열
        timerCircle.style.background = 'linear-gradient(135deg, #00cc44 0%, #009933 100%)';
        timerCircle.style.borderColor = '#00cc44';
        timerCircle.style.boxShadow = '0 0 40px rgba(0, 204, 68, 0.8), inset 0 0 25px rgba(255, 255, 255, 0.2)';
        timerText.style.color = '#ffffff';
        timerText.style.animation = 'timerTextGlow 0.5s infinite alternate';
        
        if (Math.floor(gameState.timer * 10) % 2 === 0) {
            timerCircle.style.opacity = '0.8';
        } else {
            timerCircle.style.opacity = '1';
        }
    } else if (percent < 0.3) {
        timerCircle.style.background = 'linear-gradient(135deg, #ff4444 0%, #c44569 100%)';
        timerCircle.style.borderColor = '#ff4444';
        timerCircle.style.boxShadow = '0 0 40px rgba(255, 68, 68, 0.8), inset 0 0 25px rgba(255, 255, 255, 0.2)';
        timerText.style.color = '#ffd700';
        timerText.style.animation = 'timerTextGlow 0.5s infinite alternate';
        
        if (Math.floor(gameState.timer * 10) % 2 === 0) {
            timerCircle.style.opacity = '0.8';
        } else {
            timerCircle.style.opacity = '1';
        }
    } else if (percent < 0.6) {
        timerCircle.style.background = 'linear-gradient(135deg, #ff9a76 0%, #ff6b6b 100%)';
        timerCircle.style.borderColor = '#ff9a76';
        timerCircle.style.boxShadow = '0 0 35px rgba(78, 205, 196, 0.6), inset 0 0 25px rgba(255, 255, 255, 0.15)';
        timerText.style.color = 'white';
        timerText.style.animation = 'timerTextGlow 1s infinite alternate';
        timerCircle.style.opacity = '1';
    } else {
        timerCircle.style.background = 'linear-gradient(135deg, #2c7873 0%, #4ecdc4 100%)';
        timerCircle.style.borderColor = '#44a08d';
        timerCircle.style.boxShadow = '0 0 35px rgba(78, 205, 196, 0.6), inset 0 0 25px rgba(255, 255, 255, 0.15)';
        timerText.style.color = 'white';
        timerText.style.animation = 'timerTextGlow 1s infinite alternate';
        timerCircle.style.opacity = '1';
    }
}

// ==============================================
// 답변 제출 (OX) - 로그 중복 제거
// ==============================================
function submitAnswer(answer) {
    // 처리 중이거나 전투가 아니면 무시
    if (gameState.isProcessing || !gameState.isBattleActive) {
        console.log('처리 불가:', {processing: gameState.isProcessing, battle: gameState.isBattleActive});
        return;
    }
    
    console.log('답변 제출:', answer);
    const isCorrect = (answer === gameState.currentAnswer);
    handleAnswer(isCorrect);
}

// ==============================================
// 확률적 이벤트 처리
// ==============================================
function processRandomEvents() {
    const floorIndex = gameState.monsterIndex;
    const monsterInfo = monsterInfos[floorIndex];
    
    // 1. 회피 체크 (공격 시작 전)
    if (Math.random() < monsterInfo.dodgeChance && !gameState.dodgeActive && !gameState.defenseActive) {
        gameState.dodgeActive = true;
        showDodgeEffect();
        return 'dodge';
    }
    
    // 2. 크리티컬 체크
    if (Math.random() < monsterInfo.criticalChance) {
        gameState.criticalMultiplier = 2.0;
        return 'critical';
    } else {
        gameState.criticalMultiplier = 1.0;
    }
    
    // 3. 독 체크 (영웅에게)
    if (Math.random() < monsterInfo.poisonChance && !gameState.isPoisoned) {
        gameState.isPoisoned = true;
        gameState.poisonTimer = 3; // 3문제 동안 지속
        gameState.lastPoisonFloor = gameState.currentFloor;
        showPoisonEffect();
        return 'poison';
    }
    
    return 'normal';
}

// ==============================================
// 답변 처리 (수정됨 - 회피시 대사 변경)
// ==============================================
function handleAnswer(isCorrect) {
    // 처리 중 표시
    gameState.isProcessing = true;
    
    // 타이머 정리
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    // 무적 상태 체크
    if (gameState.isInvincible || gameState.defenseActive) {
        // 무적 상태에서는 데미지가 들어가지 않음
        showDamagePopup(DamageType.INVINCIBLE, 0);
        addDamageLog(DamageType.INVINCIBLE, 0);
        showMonsterDialog('correct');
        
        // 무적 상태임을 명시적으로 표시
        const timerText = document.getElementById('timer-text');
        if (timerText) {
            timerText.innerHTML = `${gameState.timer.toFixed(1)} <span class="invincible-text">(무적)</span>`;
        }
        
        gameState.isProcessing = false;
        
        // 다음 문제 생성
        setTimeout(() => {
            if (gameState.isBattleActive && gameState.monsterHP > 0 && gameState.heroHP > 0) {
                generateNewQuestion();
            }
        }, 1000);
        
        return;
    }
    
    if (isCorrect) {
        // 정답 처리
        gameState.combo++;
        
        // 콤보에 따른 대사 선택
        if (gameState.combo >= 3) {
            showMonsterDialog('combo');
        } else {
            showMonsterDialog('correct');
        }
        
        playSound('correct-sound', 0.6);
        
        // 확률적 이벤트 처리
        const eventType = processRandomEvents();
        
        // 회피 체크
        if (eventType === 'dodge') {
            // 회피했을 때 - "틀렸어요" 대신 회피 대사 표시
            showDamagePopup(DamageType.DODGE, 0);
            addDamageLog(DamageType.DODGE, 0);
            // 수정: 'incorrect' 대신 'correct' 대사 표시 (문제는 맞췄지만 회피한 경우)
            showMonsterDialog('correct'); // 또는 특별한 회피 대사로 변경
            
            // 회피 효과음
            playSound('dodge-sound', 0.5);
            
            gameState.isProcessing = false;
            
            // 다음 문제 생성
            setTimeout(() => {
                if (gameState.isBattleActive && gameState.monsterHP > 0 && gameState.heroHP > 0) {
                    generateNewQuestion();
                }
            }, 1500);
            
            return;
        }
        
        // 히트 효과
        createHitEffect();
        playSound('hit-sound', 0.4);
        
        // 기본 데미지 계산
        let baseDamage = Math.floor(20 + gameState.combo * 3);
        const isCritical = (eventType === 'critical');
        
        // 크리티컬 적용
        if (isCritical) {
            baseDamage = Math.floor(baseDamage * gameState.criticalMultiplier);
        }
        
        // 몬스터에게 데미지
        monsterTakeDamage(baseDamage, isCritical);
        
    } else {
        // 오답 처리
        gameState.combo = 0;
        showMonsterDialog('incorrect');
        playSound('wrong-sound', 0.6);
        heroTakeDamage();
    }
    
    updateUI();
    
    // 다음 문제 생성
    if (gameState.isBattleActive && gameState.monsterHP > 0 && gameState.heroHP > 0) {
        setTimeout(() => {
            // 이벤트 상태 초기화
            gameState.dodgeActive = false;
            gameState.regenActive = false;
            gameState.specialEventActive = false;
            
            gameState.isProcessing = false;
            generateNewQuestion();
        }, 1500);
    } else {
        gameState.isProcessing = false;
    }
}


// ==============================================
// 몬스터 데미지 처리 - 로그 중복 제거
// ==============================================
function monsterTakeDamage(damage, isCritical = false) {
    gameState.monsterHP -= damage;
    
    // 히트 효과
    createHitEffect();
    
    // 데미지 팝업 표시 (데미지 로그는 showDamagePopup에서 처리)
    showDamagePopup(DamageType.MONSTER, damage, isCritical ? 'critical' : '');
    
    if (gameState.monsterHP < 0) {
        gameState.monsterHP = 0;
        monsterDefeated();
    }
    
    // 몬스터 HP 바 효과
    const monsterHpBar = document.getElementById('monster-hp-bar');
    if (monsterHpBar) {
        monsterHpBar.style.background = isCritical ? 
            'linear-gradient(90deg, #ffd700 0%, #ffaa00 100%)' :
            'linear-gradient(90deg, #ff6b6b 0%, #ff4444 100%)';
        
        setTimeout(() => {
            monsterHpBar.style.background = 'linear-gradient(90deg, #ff6b6b 0%, #ff9a76 50%, #ffb996 100%)';
        }, 300);
    }
    
    updateUI();
}
// ==============================================
// 히트 이펙트 생성
// ==============================================
function createHitEffect() {
    const hitEffect = document.getElementById('hit-effect');
    const monsterEmoji = document.getElementById('monster-emoji');
    
    if (!hitEffect || !monsterEmoji) return;
    
    // 이펙트 초기화
    hitEffect.style.animation = 'none';
    hitEffect.style.opacity = '0';
    
    // 히트 이펙트 애니메이션
    setTimeout(() => {
        hitEffect.style.opacity = '0.8';
        hitEffect.style.animation = 'hitFlash 0.5s ease-out forwards';
        
        // 난이도에 따른 몬스터 흔들림 효과
        if (gameState.currentFloor <= 5) {
            monsterEmoji.style.transform = 'translateX(-10px) translateY(-10px)';
        } else if (gameState.currentFloor <= 10) {
            monsterEmoji.style.transform = 'translateX(-15px) translateY(-15px) rotate(-5deg)';
        } else if (gameState.currentFloor <= 15) {
            monsterEmoji.style.transform = 'translateX(-20px) translateY(-20px) rotate(-10deg) scale(1.1)';
        } else {
            monsterEmoji.style.transform = 'translateX(-25px) translateY(-25px) rotate(-15deg) scale(1.2)';
        }
        
        setTimeout(() => {
            if (gameState.currentFloor <= 5) {
                monsterEmoji.style.transform = 'translateX(10px) translateY(10px)';
            } else if (gameState.currentFloor <= 10) {
                monsterEmoji.style.transform = 'translateX(15px) translateY(15px) rotate(5deg)';
            } else if (gameState.currentFloor <= 15) {
                monsterEmoji.style.transform = 'translateX(20px) translateY(20px) rotate(10deg) scale(1.1)';
            } else {
                monsterEmoji.style.transform = 'translateX(25px) translateY(25px) rotate(15deg) scale(1.2)';
            }
            
            setTimeout(() => {
                monsterEmoji.style.transform = '';
            }, 100);
        }, 100);
    }, 10);
}

// ==============================================
// 화면 흔들림 효과 (타입별)
// ==============================================
function screenShake(type = 'hero') {
    const screen = document.getElementById('screen-shake');
    if (!screen) return;
    
    // 이전 애니메이션 정리
    screen.style.animation = 'none';
    
    let shakeAnimation;
    switch(type) {
        case 'hero':
            shakeAnimation = 'heroDamageShake 0.5s ease-out';
            break;
        case 'monster':
            shakeAnimation = 'monsterDamageShake 0.3s ease-out';
            break;
        case 'death':
            shakeAnimation = 'deathShake 1s ease-out';
            break;
        default:
            shakeAnimation = 'hitShakeMedium 0.5s ease-out';
    }
    
    // 새 흔들림 효과 적용
    setTimeout(() => {
        screen.style.animation = shakeAnimation;
    }, 10);
}


// ==============================================
// 몬스터 처치
// ==============================================
function monsterDefeated() {
    gameState.isBattleActive = false;
    gameState.isProcessing = true;
    
    // 타이머 정리
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    showMonsterDialog('victory', 4000);
    playSound('correct-sound', 0.8);
    playSound('powerup-sound', 0.6);
    
    // 문지기 죽음 화면 흔들림
    deathScreenShake();
    
    // 몬스터 처치 애니메이션
    const monsterEmoji = document.getElementById('monster-emoji');
    if (monsterEmoji) monsterEmoji.style.animation = 'monsterDeath 1s forwards';
    
    // 폭죽 효과
    createConfetti();
    
    // 결과 화면 표시
    setTimeout(() => {
        gameState.isProcessing = false;
        
        // 20층 클리어 체크
        const resultScreen = document.getElementById('result-screen');
        const resultTitle = document.getElementById('result-title');
        const resultDetails = document.getElementById('result-details');
        const resultIcon = document.getElementById('result-icon');
        const resultBtn = document.getElementById('result-btn');
        const retryBtn = document.getElementById('retry-btn');
        
        if (resultScreen && resultTitle && resultDetails && resultIcon && resultBtn && retryBtn) {
            if (gameState.currentFloor >= 20) {
                resultTitle.textContent = '최종 승리!';
                resultDetails.innerHTML = `
                    축하합니다! 합격의 탑을 정복했습니다!<br>
                    20층의 최종 보스를 물리쳤습니다!<br>
                    최고 콤보: ${gameState.combo}<br>
                    남은 HP: ${gameState.heroHP}/${gameState.heroMaxHP}<br>
                    남은 포션: ${gameState.potions}
                `;
                resultIcon.textContent = '👑';
                resultBtn.style.display = 'flex';
                resultBtn.textContent = '처음으로 돌아가기';
                resultBtn.onclick = retryGame;
                retryBtn.style.display = 'none';
            } else {
                resultTitle.textContent = '승리!';
                resultDetails.innerHTML = `
                    ${gameState.monsterName}을(를) 물리쳤습니다!<br>
                    최고 콤보: ${gameState.combo}<br>
                    다음 층으로 이동합니다.
                `;
                resultIcon.textContent = '🏆';
                resultBtn.style.display = 'flex';
                resultBtn.textContent = '다음 층으로';
                resultBtn.onclick = nextFloor;
                retryBtn.style.display = 'none';
            }
            
            resultScreen.style.display = 'flex';
        }
    }, 2000);
}

// ==============================================
// 문지기 죽음 화면 흔들림
// ==============================================
function deathScreenShake() {
    const deathShake = document.getElementById('death-shake');
    if (!deathShake) return;
    
    // 이전 애니메이션 정리
    deathShake.style.animation = 'none';
    
    // 매우 강력한 흔들림 효과
    setTimeout(() => {
        deathShake.style.animation = 'deathShake 1s ease-out';
        playSound('explosion-sound', 0.7);
    }, 10);
}

// ==============================================
// 폭죽 효과
// ==============================================
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    if (!confettiContainer) return;
    
    confettiContainer.innerHTML = '';
    
    const colors = ['#ff4444', '#ffd700', '#4ecdc4', '#a3d9ff', '#ff9a76'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 1;
        
        confetti.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            top: -20px;
            left: ${left}%;
            border-radius: ${size < 8 ? '50%' : '2px'};
            animation: confettiFall ${animationDuration}s ease-in ${animationDelay}s forwards;
            opacity: ${Math.random() * 0.8 + 0.2};
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        confettiContainer.appendChild(confetti);
    }
}

// ==============================================
// 게임 오버
// ==============================================
function gameOver() {
    gameState.isBattleActive = false;
    gameState.isGameOver = true;
    gameState.isProcessing = true;
    
    // 타이머 정리
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    showMonsterDialog('defeat', 4000);
    
    // 결과 화면 표시
    setTimeout(() => {
        gameState.isProcessing = false;
        
        const resultScreen = document.getElementById('result-screen');
        const resultTitle = document.getElementById('result-title');
        const resultDetails = document.getElementById('result-details');
        const resultIcon = document.getElementById('result-icon');
        const resultBtn = document.getElementById('result-btn');
        const retryBtn = document.getElementById('retry-btn');
        
        if (resultScreen && resultTitle && resultDetails && resultIcon && resultBtn && retryBtn) {
            resultScreen.style.display = 'flex';
            resultTitle.textContent = '패배!';
            resultDetails.innerHTML = `
                영웅이 쓰러졌습니다...<br>
                ${gameState.currentFloor}층에서 도전이 종료되었습니다.<br>
                최고 콤보: ${gameState.combo}<br>
                남은 포션: ${gameState.potions}
            `;
            resultIcon.textContent = '💀';
            resultBtn.style.display = 'none';
            retryBtn.style.display = 'flex';
        }
    }, 2000);
    
    // 게임 오버 효과음
    playSound('wrong-sound', 0.6);
}

// ==============================================
// 다음 층으로 이동
// ==============================================
function nextFloor() {
    // 처리 중이면 무시
    if (gameState.isProcessing) return;
    
    gameState.isProcessing = true;
    
    const resultScreen = document.getElementById('result-screen');
    if (resultScreen) resultScreen.style.display = 'none';
    
    gameState.currentFloor++;
    gameState.combo = 0;
    gameState.isBattleActive = false;
    gameState.isGameOver = false;
    
    // 몬스터 정보 업데이트
    updateMonsterStats();
    
    // 난이도 변경 시 카테고리 순환 재초기화
    initializeCategoryRotation();
    
    // 상태 효과 초기화
    gameState.isPoisoned = false;
    gameState.poisonTimer = 0;
    gameState.isInvincible = false;
    gameState.invincibleTimer = 0;
    gameState.dodgeActive = false;
    gameState.regenActive = false;
    gameState.specialEventActive = false;
    gameState.defenseActive = false;
    gameState.defenseType = '';
    gameState.defenseTimer = 0;
    
    // 몬스터 이모지 변경
    const monsterEmoji = document.getElementById('monster-emoji');
    if (monsterEmoji) {
        monsterEmoji.textContent = monsterInfos[Math.min(gameState.currentFloor - 1, 19)].emoji;
        monsterEmoji.style.animation = '';
        monsterEmoji.style.transform = '';
        
        // 몬스터 크기 증가 효과
        monsterEmoji.style.transform = 'scale(1.2)';
        setTimeout(() => {
            monsterEmoji.style.transform = 'scale(1)';
            monsterEmoji.style.transition = 'transform 0.5s ease';
        }, 300);
    }
    
    updateUI();
    showMonsterDialog('welcome', 3000);
    
    // 1초 후 자동으로 전투 시작
    setTimeout(() => {
        gameState.isProcessing = false;
        gameState.isBattleActive = true;
        generateNewQuestion();
    }, 1000);
}

// ==============================================
// 다시 시작
// ==============================================
function retryGame() {
    // 처리 중이면 무시
    if (gameState.isProcessing) return;
    
    gameState.isProcessing = true;
    
    const resultScreen = document.getElementById('result-screen');
    if (resultScreen) resultScreen.style.display = 'none';
    
    // 게임 상태 초기화
    gameState = {
        heroHP: 100,
        heroMaxHP: 100,
        monsterHP: 100,
        monsterMaxHP: 100,
        currentFloor: 1,
        combo: 0,
        potions: 3,
        isBattleActive: false,
        isGameStarted: true,
        isGameOver: false,
        isProcessing: false,
        currentQuestionType: '민법',
        currentQuestion: '',
        currentAnswer: '',
        timer: 10.0,
        timerInterval: null,
        monsterName: '진입 문지기',
        monsterDifficulty: '쉬움',
        speechTimeout: null,
        allQuestions: gameState.allQuestions,
        questionHistory: [],
        categoryRotation: [],
        currentCategoryIndex: 0,
        usedQuestions: {
            '민법': [],
            '특허법': [],
            '상표법': [],
            '디자인보호법': []
        },
        
        // 새로운 상태 변수들
        isPoisoned: false,
        poisonTimer: 0,
        isInvincible: false,
        invincibleTimer: 0,
        lastPoisonFloor: -1,
        criticalMultiplier: 1.0,
        dodgeActive: false,
        regenActive: false,
        specialEventActive: false,
        monsterIndex: 0,
        defenseActive: false,
        defenseType: '',
        defenseTimer: 0,
        
        // 데미지 로그
        damageLog: []
    };
    
    // 몬스터 정보 초기화
    updateMonsterStats();
    
    // 카테고리 순환 배열 초기화
    initializeCategoryRotation();
    
    // 몬스터 이모지 초기화
    const monsterEmoji = document.getElementById('monster-emoji');
    if (monsterEmoji) {
        monsterEmoji.textContent = '👹';
        monsterEmoji.style.animation = '';
        monsterEmoji.style.transform = '';
    }
    
    updateUI();
    showMonsterDialog('welcome', 3000);
    
    // 1초 후 자동으로 전투 시작
    setTimeout(() => {
        gameState.isProcessing = false;
        gameState.isBattleActive = true;
        generateNewQuestion();
    }, 1000);
}

// ==============================================
// 포션 사용 (독 해제 포함) - 수정됨
// ==============================================
function usePotion() {
    if (gameState.potions <= 0 || gameState.heroHP >= gameState.heroMaxHP || gameState.isProcessing) {
        // 포션을 사용할 수 없는 이유 표시
        if (gameState.potions <= 0) {
            showDamagePopup(DamageType.HERO, 0, '포션 없음!');
        } else if (gameState.heroHP >= gameState.heroMaxHP) {
            showDamagePopup(DamageType.HEAL, 0, '체력 최대!');
        }
        return;
    }
    
    gameState.potions--;
    const healAmount = Math.min(30, gameState.heroMaxHP - gameState.heroHP);
    gameState.heroHP += healAmount;
    
    // 독 상태 해제
    if (gameState.isPoisoned) {
        gameState.isPoisoned = false;
        gameState.poisonTimer = 0;
        updateStatusEffects(); // 수정됨: updatePoisonUI() 대신 updateStatusEffects() 호출
    }
    
    // 회복 효과 표시
    showDamagePopup(DamageType.HEAL, healAmount);
    addDamageLog(DamageType.HEAL, healAmount);
    showMonsterDialog('potion');
    
    // 포션 사용 효과
    const heroHpBar = document.getElementById('hero-hp-bar');
    if (heroHpBar) {
        heroHpBar.style.background = 'linear-gradient(90deg, #4ecdc4 0%, #2c7873 100%)';
        heroHpBar.style.animation = 'healPulse 1s ease-out';
        
        setTimeout(() => {
            heroHpBar.style.background = 'linear-gradient(90deg, #ff0000 0%, #ff6b6b 50%, #ff9a76 100%)';
        }, 1000);
    }
    
    // 회복 효과음
    playSound('correct-sound', 0.4);
    updateUI();
}

// ==============================================
// 사운드 재생
// ==============================================
function playSound(soundId, volume = 1.0) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.volume = volume;
        sound.currentTime = 0;
        sound.play().catch(e => {
            // 오류 무시
        });
    }
}

// ==============================================
// 시간 초과 처리
// ==============================================
function timeOut() {
    // 처리 중이면 무시
    if (gameState.isProcessing) return;
    
    gameState.isProcessing = true;
    
    showMonsterDialog('timeout');
    playSound('wrong-sound', 0.4);
    heroTakeDamage();
    
    if (gameState.isBattleActive && gameState.heroHP > 0) {
        setTimeout(() => {
            gameState.isProcessing = false;
            generateNewQuestion();
        }, 1500);
    } else {
        gameState.isProcessing = false;
    }
}

// ==============================================
// 특수 효과 표시 함수들
// ==============================================
function showDodgeEffect() {
    const dodgeEffect = document.getElementById('dodge-effect');
    if (!dodgeEffect) return;
    
    dodgeEffect.style.opacity = '0';
    dodgeEffect.style.animation = 'none';
    
    setTimeout(() => {
        dodgeEffect.style.opacity = '1';
        dodgeEffect.style.animation = 'dodgeEffect 1s ease-out forwards';
    }, 10);
}

function showCriticalEffect() {
    const criticalEffect = document.getElementById('critical-effect');
    if (!criticalEffect) return;
    
    criticalEffect.style.opacity = '0';
    criticalEffect.style.animation = 'none';
    
    setTimeout(() => {
        criticalEffect.style.opacity = '1';
        criticalEffect.style.animation = 'criticalEffect 1s ease-out forwards';
    }, 10);
}

// ==============================================
// 페이지 로드 시 초기화
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    // CSS 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = `
        /* ===== 데미지 로그 스타일 ===== */
.damage-log-container {
    flex: 1;
    min-width: 300px;
    max-width: 400px;
    margin: 0 20px;
    order: 2; /* tower-info(1)와 player-status(3) 사이에 위치 */
}

.damage-log {
    height: 70px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 15px;
    padding: 8px 12px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.damage-log::-webkit-scrollbar {
    width: 8px;
}

.damage-log::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}

.damage-log::-webkit-scrollbar-thumb {
    background: rgba(78, 205, 196, 0.5);
    border-radius: 4px;
}

.log-entry {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 0.85rem;
    animation: logFadeIn 0.3s ease-out;
    background: rgba(255, 255, 255, 0.08);
}

.log-icon {
    font-size: 1rem;
    min-width: 20px;
    text-align: center;
}

.log-text {
    flex: 1;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.hero-damage {
    border-left: 3px solid #ff6b6b;
    background: rgba(255, 107, 107, 0.15);
    color: #ff9a76;
}

.monster-damage {
    border-left: 3px solid #ff4444;
    background: rgba(255, 68, 68, 0.15);
    color: #ff9a76;
}

.dodge-effect {
    border-left: 3px solid #4ecdc4;
    background: rgba(78, 205, 196, 0.15);
    color: #a3d9ff;
}

.poison-effect {
    border-left: 3px solid #00cc44;
    background: rgba(0, 204, 68, 0.15);
    color: #00cc44;
}

.invincible-effect {
    border-left: 3px solid #a855f7;
    background: rgba(168, 85, 247, 0.15);
    color: #c792ea;
}

.heal-effect {
    border-left: 3px solid #4ecdc4;
    background: rgba(78, 205, 196, 0.15);
    color: #4ecdc4;
}

.regen-effect {
    border-left: 3px solid #00cc44;
    background: rgba(0, 204, 68, 0.15);
    color: #00cc44;
}

@keyframes logFadeIn {
    from { opacity: 0; transform: translateX(10px); }
    to { opacity: 1; transform: translateX(0); }
}
        
        /* 독 UI 스타일 */
        .poison-ui {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            background: rgba(0, 204, 68, 0.2);
            border: 2px solid #00cc44;
            border-radius: 15px;
            padding: 10px 20px;
            backdrop-filter: blur(5px);
            z-index: 50;
            animation: poisonUIGlow 1s infinite alternate;
        }
        
        .poison-icons {
            display: flex;
            gap: 10px;
        }
        
        .poison-icon {
            font-size: 1.5rem;
            animation: poisonIconFloat 2s infinite ease-in-out;
        }
        
        .poison-timer {
            color: #00cc44;
            font-weight: bold;
            font-size: 0.9rem;
        }
        
        @keyframes poisonUIGlow {
            from { box-shadow: 0 0 10px rgba(0, 204, 68, 0.3); }
            to { box-shadow: 0 0 20px rgba(0, 204, 68, 0.6); }
        }
        
        @keyframes poisonIconFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        
        @keyframes damagePopup {
            0% { transform: translate(-50%, 0) scale(0.5); opacity: 0; }
            20% { transform: translate(-50%, -80px) scale(1.2); opacity: 1; }
            80% { transform: translate(-50%, -150px) scale(0.9); opacity: 0.7; }
            100% { transform: translate(-50%, -200px) scale(0.5); opacity: 0; }
        }
        
        /* 기존 애니메이션들 */
        @keyframes hitShakeEasy {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes hitShakeMedium {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-8px) translateY(-3px); }
            20%, 40%, 60%, 80% { transform: translateX(8px) translateY(3px); }
        }
        
        @keyframes hitShakeHard {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-12px) translateY(-5px) rotate(-1deg); }
            20%, 40%, 60%, 80% { transform: translateX(12px) translateY(5px) rotate(1deg); }
        }
        
        @keyframes hitShakeExtreme {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-15px) translateY(-7px) rotate(-2deg); }
            20%, 40%, 60%, 80% { transform: translateX(15px) translateY(7px) rotate(2deg); }
        }
        
        @keyframes deathShake {
            0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
            10% { transform: translateX(-25px) translateY(-10px) rotate(-3deg); }
            20% { transform: translateX(25px) translateY(10px) rotate(3deg); }
            30% { transform: translateX(-20px) translateY(-8px) rotate(-2deg); }
            40% { transform: translateX(20px) translateY(8px) rotate(2deg); }
            50% { transform: translateX(-15px) translateY(-6px) rotate(-1deg); }
            60% { transform: translateX(15px) translateY(6px) rotate(1deg); }
            70% { transform: translateX(-10px) translateY(-4px) rotate(-0.5deg); }
            80% { transform: translateX(10px) translateY(4px) rotate(0.5deg); }
            90% { transform: translateX(-5px) translateY(-2px) rotate(-0.2deg); }
        }
        
        @keyframes hitFlash {
            0% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0; transform: scale(1); }
        }
        
        @keyframes monsterDeath {
            0% { transform: scale(1) rotate(0deg); opacity: 1; filter: brightness(1); }
            50% { transform: scale(1.3) rotate(-15deg); opacity: 0.8; filter: brightness(2) hue-rotate(90deg); }
            100% { transform: scale(0) rotate(45deg); opacity: 0; filter: brightness(3) hue-rotate(180deg); }
        }
        
        @keyframes healPulse {
            0% { box-shadow: 0 0 0 0 rgba(78, 205, 196, 0.7); }
            70% { box-shadow: 0 0 0 20px rgba(78, 205, 196, 0); }
            100% { box-shadow: 0 0 0 0 rgba(78, 205, 196, 0); }
        }
        
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes timerTextGlow {
            from { text-shadow: 0 0 5px currentColor; }
            to { text-shadow: 0 0 15px currentColor, 0 0 20px currentColor; }
        }
        
        /* 영웅 데미지 흔들림 */
        @keyframes heroDamageShake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        /* 몬스터 데미지 흔들림 */
        @keyframes monsterDamageShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            75% { transform: translateX(3px); }
        }
        
        /* 무적 상태 텍스트 */
        .invincible-text {
            color: #a855f7;
            font-size: 0.8em;
            margin-left: 5px;
        }
    `;
    document.head.appendChild(style);
    
    // 게임 초기화
    initSimpleGame();
    createDamageLogUI();
});