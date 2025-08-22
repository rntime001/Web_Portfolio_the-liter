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
// ------------------------페이지네이션 연출------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
    const listEl = document.querySelector('.iven_c_box');                 // UL
    const allCards = Array.from(listEl.querySelectorAll(':scope > li'));  // 원본 카드
    const searchInput = document.querySelector('#c_search');
    const searchBtn = document.querySelector('.search_btn');
    const pagination = document.querySelector('.pgnation');
    const prevBtn = pagination.querySelector('.prev');
    const nextBtn = pagination.querySelector('.next');
    const ul = pagination.querySelector('ul');

    const cardsPerPage = 12;
    let filteredCards = [...allCards];
    let currentPage = 1;

    // 현재 배열을 UL에 재배치(빈칸 방지 핵심)
    function rebuildList(cards) {
        // 성능 위해 DocumentFragment 사용
        const frag = document.createDocumentFragment();
        cards.forEach(card => {
        // 보이기 초기화(스타일 클린)
        card.style.display = '';
        frag.appendChild(card);
        });
        listEl.innerHTML = '';
        listEl.appendChild(frag);
    }

    function showPage(page) {
        const totalPages = Math.max(1, Math.ceil(filteredCards.length / cardsPerPage));
        currentPage = Math.min(Math.max(1, page), totalPages);

        // 우선 전부 보이게 초기화(레이아웃 엔진에 맡김)
        filteredCards.forEach(card => { card.style.display = ''; });

        // 범위 밖은 숨김
        const start = (currentPage - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        filteredCards.forEach((card, idx) => {
        card.style.display = (idx >= start && idx < end) ? '' : 'none';
        });

        // 페이지 링크 상태
        const pageLinks = ul.querySelectorAll('a');
        pageLinks.forEach(link => link.removeAttribute('aria-current'));
        const active = ul.querySelector(`a[data-page="${currentPage}"]`);
        if (active) active.setAttribute('aria-current', 'page');

        // 페이지네이션 표시 여부
        pagination.style.display = (totalPages > 1) ? 'flex' : 'none';
    }

    function updatePagination() {
        const totalPages = Math.max(1, Math.ceil(filteredCards.length / cardsPerPage));
        ul.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = i;
        a.dataset.page = i;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(i);
        });
        li.appendChild(a);
        ul.appendChild(li);
        }
    }

    function searchEvents() {
        const keyword = searchInput.value.trim().toLowerCase();

        if (keyword === '') {
        filteredCards = [...allCards];
        } else {
        filteredCards = allCards.filter(card => {
            const text = card.textContent.toLowerCase();
            const alt = card.querySelector('img')?.alt?.toLowerCase() || '';
            return text.includes(keyword) || alt.includes(keyword);
        });
        }

        // 결과를 실제로 재배치 → nth-child 규칙/그리드 갭 이슈 해결
        rebuildList(filteredCards);

        updatePagination();
        showPage(1);
    }

    // 이전/다음
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(currentPage - 1);
    });
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(currentPage + 1);
    });

    // 검색 트리거
    searchBtn.addEventListener('click', searchEvents);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
        e.preventDefault();
        searchEvents();
        }
    });

    // 초기 상태
    rebuildList(allCards);
    updatePagination();
    showPage(1);
    });