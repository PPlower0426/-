function detectDevice() {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Tablet|Silk/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    
    return {
        isMobile: isMobile,
        isTablet: isTablet,
        isDesktop: isDesktop,
        userAgent: userAgent
    };
}

// 현재 페이지가 데스크탑/모바일 중 어느 페이지인지 확인
function checkCurrentPage() {
    const currentPage = window.location.pathname;
    const device = detectDevice();
    
    // 데스크탑 기기인데 모바일 페이지에 있으면
    if (device.isDesktop && currentPage.includes('mobile.html')) {
        window.location.href = 'index.html';
    }
    // 모바일/태블릿인데 데스크탑 페이지에 있으면
    else if ((device.isMobile || device.isTablet) && !currentPage.includes('mobile.html')) {
        window.location.href = 'mobile.html';
    }
}

// 페이지 로드 시 실행
window.addEventListener('DOMContentLoaded', checkCurrentPage);