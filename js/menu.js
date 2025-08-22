// ----------------------------탑버튼 연출-----------------
document.addEventListener('DOMContentLoaded', () => {
    const topBtn = document.querySelector('.top_btn');

    if (!topBtn) return;

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

    // 스크롤 이벤트 등록
    window.addEventListener('scroll', showTopBtn);

    // 초기 상태 반영
    showTopBtn();
});
// ----------------------------체크박스 연출-----------------
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.check_box_m');
    const checkAll = document.getElementById('check_all');
    const menuItems = document.querySelectorAll('.main_coffee_box li');

    // 1. 처음 로딩 시 전체만 체크
    checkAll.checked = true;
    checkboxes.forEach(cb => {
        if (cb !== checkAll) cb.checked = false;
    });

    // 2. '전체' 클릭 시 -> 다른 항목 모두 해제하고 자신만 체크 (해제는 허용하지 않음)
    checkAll.addEventListener('change', (e) => {
        if (!checkAll.checked) {
            // 해제를 막음
            checkAll.checked = true;
            return;
        }

        // 다른 항목들 해제
        checkboxes.forEach(cb => {
            if (cb !== checkAll) cb.checked = false;
        });

        filterMenu();
    });

    // 3. 개별 체크박스 클릭 시 전체 자동 해제
    checkboxes.forEach(cb => {
        if (cb !== checkAll) {
            cb.addEventListener('change', () => {
                checkAll.checked = false;
                filterMenu();
            });
        }
    });

    // 4. 필터링 함수
    const filterMenu = () => {
        const checkedValues = Array.from(checkboxes)
            .filter(cb => cb.checked && cb !== checkAll)
            .map(cb => cb.closest('label').textContent.trim());

        menuItems.forEach(item => {
            const tags = item.dataset.tags || '';
            if (checkAll.checked || checkedValues.length === 0) {
                item.style.display = 'flex';
                return;
            }

            const isMatch = checkedValues.some(tag => tags.includes(tag));
            item.style.display = isMatch ? 'flex' : 'none';
        });
    };

    // 5. 초기 필터 적용
    filterMenu();
});
//--------------------------------섬네일 연출----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 썸네일 버튼
    const thumb1 = document.querySelector('.thumb');       // 6월 섬네일
    const thumb2 = document.querySelector('.thumb2');      // 7월 섬네일

    // 큰 이미지 요소
    const big1 = document.querySelector('.big_seson_img');     // 6월 큰 이미지
    const big2 = document.querySelector('.big_seson_img2');    // 7월 큰 이미지

    // 페이지 처음 열릴 때 6월 이미지 보이도록 세팅 (안정성 보장)
    big1.classList.add('active');
    big2.classList.remove('active');

    // 6월 섬네일 클릭 시
    thumb1.addEventListener('click', (e) => {
        e.preventDefault();
        big1.classList.add('active');
        big2.classList.remove('active');
    });

    // 7월 섬네일 클릭 시
    thumb2.addEventListener('click', (e) => {
        e.preventDefault();
        big2.classList.add('active');
        big1.classList.remove('active');
    });
});