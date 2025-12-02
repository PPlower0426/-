// 자동 리디렉션 device-detector.js

(function() {
    'use strict';
    
    // 디바이스 감지 함수
    function detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const viewportWidth = window.innerWidth;
        
        // User Agent로 감지
        const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
        const isTabletUA = /ipad|tablet|silk/.test(userAgent);
        
        // 뷰포트 크기로 감지
        const isMobileViewport = viewportWidth <= 768;
        const isTabletViewport = viewportWidth > 768 && viewportWidth <= 1024;
        
        return {
            isMobile: isMobileUA || isMobileViewport,
            isTablet: isTabletUA || isTabletViewport,
            isDesktop: !(isMobileUA || isTabletUA || isMobileViewport || isTabletViewport),
            userAgent: userAgent,
            viewportWidth: viewportWidth
        };
    }
    
    // 페이지 확인 및 자동 리디렉션
    function checkAndRedirect() {
        const currentUrl = window.location.href;
        const currentPath = window.location.pathname;
        const device = detectDevice();
        
        console.log('디바이스 감지 결과:', {
            isMobile: device.isMobile,
            isTablet: device.isTablet,
            isDesktop: device.isDesktop,
            viewport: device.viewportWidth + 'px',
            currentPage: currentPath
        });
        
        // 이미 올바른 페이지에 있는지 확인
        const isOnMobilePage = currentPath.includes('mobile.html');
        const isOnIndexPage = currentPath.includes('index.html') || 
                              currentPath.endsWith('/') || 
                              currentPath.endsWith('.html') && !isOnMobilePage;
        
        // 리디렉션 조건
        let redirectTo = null;
        
        if ((device.isMobile || device.isTablet) && !isOnMobilePage) {
            // 모바일/태블릿인데 모바일 페이지가 아닐 때
            redirectTo = 'mobile.html';
        } else if (device.isDesktop && isOnMobilePage) {
            // 데스크탑인데 모바일 페이지일 때
            redirectTo = 'index.html';
        }
        
        // 리디렉션 실행
        if (redirectTo) {
            console.log('자동 리디렉션:', redirectTo);
            
            // 현재 URL에서 파일명만 변경
            const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
            const newUrl = baseUrl + redirectTo;
            
            // 무한 리디렉션 방지
            if (currentUrl !== newUrl) {
                // 약간의 지연 후 리디렉션 (게임 초기화 후)
                setTimeout(() => {
                    window.location.href = newUrl;
                }, 100);
            }
        } else {
            console.log('올바른 페이지에 있습니다.');
        }
    }
    
    // 페이지 로드 시 실행
    function init() {
        // DOM이 완전히 로드된 후 실행
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // 게임 초기화 후 리디렉션 (500ms 지연)
                setTimeout(checkAndRedirect, 500);
            });
        } else {
            setTimeout(checkAndRedirect, 500);
        }
        
        // 창 크기 변경 시 재확인 (옵션)
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                console.log('창 크기 변경 - 재감지:', window.innerWidth + 'px');
                checkAndRedirect();
            }, 500);
        });
    }
    
    // 초기화 실행
    init();
    
})();