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

//----------------------매장안내 드롭다운--------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 등록순 (왼쪽)
    const toggleBtns1 = document.querySelectorAll('.toggle_btn');
    const dropdown1 = document.querySelector('.select_list1');

    // 전체 (오른쪽)
    const toggleBtns2 = document.querySelectorAll('.toggle_btn2');
    const dropdown2 = document.querySelector('.select_list2');

    // 왼쪽 버튼 클릭
    toggleBtns1.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            if (dropdown1) dropdown1.classList.toggle('active');
            if (dropdown2) dropdown2.classList.remove('active');
        });
    });

    // 오른쪽 버튼 클릭
    toggleBtns2.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dropdown2) dropdown2.classList.toggle('active');
            if (dropdown1) dropdown1.classList.remove('active');
        });
    });

    // 바디 외 영역 클릭 시 모두 닫기
    document.addEventListener('click', () => {
        if (dropdown1) dropdown1.classList.remove('active');
        if (dropdown2) dropdown2.classList.remove('active');
    });
});

//-----------검색 및 ui 높이 조절----------//
    document.addEventListener('DOMContentLoaded', () => {
    const form    = document.getElementById('s_area_search_box');                      // 폼
    const input   = document.getElementById('s_area_search');                          // 입력창
    const btn     = document.querySelector('.search_btn');                             // 버튼
    const items   = document.querySelectorAll('.store_list_root_box .store_list_box'); // li들
    const countEl = document.querySelector('.title_new_count');                        // (n)
    const listWrap= document.querySelector('.store_list_root_box_wrap');               // 목록 래퍼

    if (!form || !input || !btn || !listWrap || items.length === 0) {
    console.warn('[store_search] 요소 확인 필요');
    return;
    }

    const itemHeight    = items[0].offsetHeight || 0;   // li 1개 높이
    const defaultHeight = listWrap.offsetHeight || 440; // CSS 최초 높이
    const totalCount    = items.length;                 // 전체 개수

    const applySearch = (isInit = false) => {
    const q = (input.value || '').trim().toLowerCase();
    let visible = 0;

    // 필터링
    items.forEach((li) => {
        const name = (li.querySelector('.c_bold')?.textContent || '').trim().toLowerCase();
        const addr = (li.querySelector('.medium')?.textContent || '').trim().toLowerCase();
        const show = q === '' ? true : (name.includes(q) || addr.includes(q));
        li.style.display = show ? '' : 'none';
        if (show) visible++;
    });

    // 카운트
    if (countEl) {
        countEl.textContent = `(${visible})`;
        countEl.setAttribute('aria-label', `현재 매장수 ${visible}개`);
    }

    // 높이: 초기 or 전체와 동일 or 검색어 없음 → 기본 높이 유지
    // 그 외(부분 결과) → (보이는 개수 × li 높이 + 20px)
    if (isInit || q === '' || visible === totalCount) {
        listWrap.style.height = `${defaultHeight}px`;
    } else {
        listWrap.style.height = `${(visible * itemHeight) + 20}px`;
    }

    // 스크롤: 6개 이하 → 숨김, 7개 이상 → auto
    listWrap.style.overflowY = (visible > 6) ? 'auto' : 'hidden';
    };

    // 버튼/엔터
    btn.addEventListener('click', () => applySearch(false));
    form.addEventListener('submit', (e) => { e.preventDefault(); applySearch(false); });
    input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); applySearch(false); }
    });

    // 메인에서 넘어온 검색어 자동 적용 (search 우선, 없으면 store도 허용)
    const params = new URLSearchParams(window.location.search);
    const preset = (params.get('search') ?? params.get('store') ?? '').trim();

    if (preset) {
    input.value = preset;
    // 레이아웃 계산 후 반영해야 높이/스크롤 깜빡임 없음
    requestAnimationFrame(() => applySearch(false));
    } else {
    applySearch(true); // 초기 상태
    }
    });