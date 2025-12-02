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
// 최종 개선된 device-detector.js
// 자동 리디렉션 + 모바일 감지 최적화

(function() {
    'use strict';
    
    // 리디렉션 방지 플래그
    let isRedirecting = false;
    
    // 정확한 디바이스 감지
    function detectDevice() {
        const ua = navigator.userAgent;
        const isIOS = /iPhone|iPad|iPod/i.test(ua);
        const isAndroid = /Android/i.test(ua);
        const isMobile = isIOS || isAndroid || /Mobile/i.test(ua);
        
        // 터치 지원 확인
        const hasTouch = ('ontouchstart' in window) || 
                        (navigator.maxTouchPoints > 0) || 
                        (navigator.msMaxTouchPoints > 0);
        
        // 뷰포트 크기 확인
        const viewportWidth = window.innerWidth;
        const isMobileViewport = viewportWidth <= 768;
        
        return {
            isMobile: isMobile || isMobileViewport,
            isIOS: isIOS,
            isAndroid: isAndroid,
            hasTouch: hasTouch,
            viewportWidth: viewportWidth
        };
    }
    
    // 스마트 리디렉션
    function smartRedirect() {
        if (isRedirecting) return;
        
        const device = detectDevice();
        const currentPath = window.location.pathname;
        const isOnMobilePage = currentPath.includes('mobile.html');
        
        console.log('디바이스 정보:', {
            모바일: device.isMobile,
            iOS: device.isIOS,
            Android: device.isAndroid,
            터치지원: device.hasTouch,
            현재페이지: currentPath
        });
        
        // 리디렉션 로직
        if (device.isMobile && !isOnMobilePage) {
            console.log('모바일 기기 감지 -> mobile.html로 이동');
            isRedirecting = true;
            setTimeout(() => {
                window.location.href = 'mobile.html';
            }, 300);
        } else if (!device.isMobile && isOnMobilePage) {
            console.log('데스크탑 기기 감지 -> index.html로 이동');
            isRedirecting = true;
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 300);
        } else {
            console.log('적절한 페이지에 있음');
        }
    }
    
    // 초기화
    function init() {
        // DOM 로드 완료 후 실행
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // 게임 초기화 완료 후 리디렉션 확인
                setTimeout(smartRedirect, 1000);
            });
        } else {
            setTimeout(smartRedirect, 1000);
        }
        
        // 이벤트 리스너
        window.addEventListener('resize', function() {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                console.log('화면 크기 변경:', window.innerWidth + 'px');
                isRedirecting = false; // 리디렉션 플래그 초기화
            }, 500);
        });
    }
    
    // 실행
    init();
    
})();