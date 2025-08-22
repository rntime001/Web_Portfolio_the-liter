document.addEventListener('DOMContentLoaded', () => {
    // 1. 탭 관련
    const tabs = document.querySelectorAll('.hs_list_box .tab');
    const historyBoxes = document.querySelectorAll('[class^="history_de_root_box"]');

    let activeTab = tabs[0];
    activeTab.classList.add('active');
    activeTab.querySelector('img').src = '/images/history/hs_icon_a.svg';

    tabs.forEach(tab => {
        const img = tab.querySelector('img');
        const tabIndex = tab.dataset.index;

        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.querySelector('img').src = '/images/history/hs_icon_d.svg';
            });

            tab.classList.add('active');
            img.src = '/images/history/hs_icon_a.svg';
            activeTab = tab;

            historyBoxes.forEach(box => box.classList.remove('active'));
            const targetBox = document.querySelector(`.history_de_root_box${tabIndex}`);
            if (targetBox) {
                targetBox.classList.add('active');
            }
        });

        tab.addEventListener('mouseenter', () => {
            tabs.forEach(t => {
                const tImg = t.querySelector('img');
                tImg.src = (t === tab) ? '/images/history/hs_icon_a.png' : '/images/history/hs_icon_d.svg';
            });
        });

        tab.addEventListener('mouseleave', () => {
            tabs.forEach(t => {
                const tImg = t.querySelector('img');
                tImg.src = (t === activeTab) ? '/images/history/hs_icon_a.png' : '/images/history/hs_icon_d.svg';
            });
        });
    });

    // 2. 인디케이터 관련 
    const indicators = document.querySelectorAll('.hs_indicators a');

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            const targetIndex = indicator.dataset.index;

            tabs.forEach(t => {
                t.classList.remove('active');
                t.querySelector('img').src = '/images/hs_icon_d.svg';
            });

            const selectedTab = document.querySelector(`.tab[data-index="${targetIndex}"]`);
            if (selectedTab) {
                selectedTab.classList.add('active');
                selectedTab.querySelector('img').src = '/images/hs_icon_a.svg';
                activeTab = selectedTab;
            }

            historyBoxes.forEach(box => box.classList.remove('active'));
            const targetBox = document.querySelector(`.history_de_root_box${targetIndex}`);
            if (targetBox) {
                targetBox.classList.add('active');
            }
        });
    });

    // 3. 탑버튼
    const topBtn = document.querySelector('.top_btn');

    if (topBtn) {
        const showTopBtn = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop < 100) {
                topBtn.style.opacity = '0';
                topBtn.style.pointerEvents = 'none';
            } else {
                topBtn.style.opacity = '1';
                topBtn.style.pointerEvents = 'auto';
            }
        };

        window.addEventListener('scroll', showTopBtn);
        showTopBtn();
    }

}); 



