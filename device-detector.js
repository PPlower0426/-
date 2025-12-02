// 안전한 device-detector.js - 리디렉션 없음, 문제 해결 버전

(function() {
    'use strict';
    
    // 디바이스 정보만 콘솔에 표시하는 간단한 함수
    function logDeviceInfo() {
        const userAgent = navigator.userAgent;
        const viewportWidth = window.innerWidth;
        
        // 디바이스 감지 (콘솔 출력용)
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isTablet = /iPad|Tablet|Silk/i.test(userAgent) || (viewportWidth > 768 && viewportWidth <= 1024);
        const isDesktop = !isMobile && !isTablet && viewportWidth > 1024;
        
        // 현재 페이지 정보
        const currentPage = window.location.pathname;
        const isMobilePage = currentPage.includes('mobile.html');
        
        // 콘솔에 정보 출력
        console.log('=== 디바이스 정보 ===');
        console.log('User Agent:', userAgent.substring(0, 100) + '...');
        console.log('Viewport Width:', viewportWidth + 'px');
        console.log('모바일 기기 감지:', isMobile);
        console.log('태블릿 감지:', isTablet);
        console.log('데스크탑 감지:', isDesktop);
        console.log('현재 페이지:', currentPage);
        console.log('모바일 페이지 여부:', isMobilePage);
        
        // 추천만 표시 (리디렉션 없음)
        if ((isMobile || isTablet) && !isMobilePage) {
            console.log('ℹ️ 추천: 모바일/태블릿 기기에서는 mobile.html 페이지가 더 적합합니다.');
            console.log('   주소창에 mobile.html을 입력하거나 링크를 클릭하세요.');
        } else if (isDesktop && isMobilePage) {
            console.log('ℹ️ 추천: 데스크탑에서는 index.html 페이지가 더 적합합니다.');
            console.log('   주소창에 index.html을 입력하거나 링크를 클릭하세요.');
        } else {
            console.log('✅ 현재 페이지가 기기에 적합합니다.');
        }
        console.log('===================');
        
        // 페이지 하단에 간단한 안내 메시지 추가 (선택사항)
        addDeviceNotice(isMobile || isTablet, isMobilePage);
    }
    
    // 디바이스 안내 메시지 추가 함수
    function addDeviceNotice(isMobileDevice, isMobilePage) {
        // 이미 추가되었는지 확인
        if (document.getElementById('device-notice')) {
            return;
        }
        
        // 안내 메시지 생성 (데모용)
        const notice = document.createElement('div');
        notice.id = 'device-notice';
        notice.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 9999;
            max-width: 300px;
            display: none;
        `;
        
        if (isMobileDevice && !isMobilePage) {
            notice.textContent = '📱 모바일용 페이지: mobile.html';
            notice.style.display = 'block';
            notice.style.cursor = 'pointer';
            notice.onclick = function() {
                window.location.href = 'mobile.html';
            };
        } else if (!isMobileDevice && isMobilePage) {
            notice.textContent = '💻 데스크탑용 페이지: index.html';
            notice.style.display = 'block';
            notice.style.cursor = 'pointer';
            notice.onclick = function() {
                window.location.href = 'index.html';
            };
        }
        
        document.body.appendChild(notice);
        
        // 10초 후 자동 숨기기
        setTimeout(() => {
            if (notice) notice.style.display = 'none';
        }, 10000);
    }
    
    // 페이지 로드 완료 시 실행
    function init() {
        // DOM이 완전히 로드된 후 약간의 지연으로 실행
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // 게임 이벤트 리스너가 설정된 후 실행 (500ms 지연)
                setTimeout(logDeviceInfo, 500);
            });
        } else {
            setTimeout(logDeviceInfo, 500);
        }
        
        // 창 크기 변경 시 재확인
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                console.log('창 크기 변경됨 - 새로운 뷰포트 너비:', window.innerWidth + 'px');
            }, 250);
        });
    }
    
    // 초기화 실행
    init();
    
})();