// ================== 공용 페이드 인 Observer ==================
document.addEventListener('DOMContentLoaded', () => {
    const fadeEls = document.querySelectorAll('.fade-left-seed, .fade-right-seed');

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // 한 번만 실행
            }
        });
    }, { threshold: 0.2 });

    fadeEls.forEach(el => fadeObserver.observe(el));
});