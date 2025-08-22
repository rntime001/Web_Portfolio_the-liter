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
//----------------------------검색기능---------------
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#s_search'); // 검색 입력창
    const searchBtn = document.querySelector('.store_ana_search_wrap .search_btn'); // 검색 버튼
    const listItems = document.querySelectorAll('.store_ana_board .content'); // 목록 항목

    // 검색 실행 함수
    function searchPosts() {
        const keyword = searchInput.value.trim().toLowerCase();

        listItems.forEach(item => {
            const titleText = item.querySelector('.title_txt').textContent.toLowerCase();
            // 검색어가 포함되면 표시, 아니면 숨김
            if (titleText.includes(keyword)) {
                item.style.display = 'flex'; // 원래 flex 레이아웃 유지
            } else {
                item.style.display = 'none';
            }
        });
    }

    // 버튼 클릭 시 검색
    searchBtn.addEventListener('click', searchPosts);

    // 엔터키로 검색
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchPosts();
        }
    });
});

