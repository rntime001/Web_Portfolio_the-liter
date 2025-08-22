    document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector(".slides");
    const dots = document.querySelectorAll(".dot");
    const slideWidth = 100;
    const originalSlides = slides.children.length;

    let currentIndex = 0;
    let isMoving = false;

    // 첫 번째 슬라이드 복제 → 맨 뒤에 붙임 (무한루프용)
    const firstClone = slides.children[0].cloneNode(true);
    slides.appendChild(firstClone);

    const totalSlides = slides.children.length;

    // 인디케이터(active) 상태 갱신
    function updateDots(index) {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index % originalSlides].classList.add("active");
    }

    // 다음 슬라이드로 이동 (항상 오른쪽 방향)
    function goToNextSlide() {
        if (isMoving) return;
        isMoving = true;
        currentIndex++;
        slides.style.transition = "transform 0.5s ease-in-out";
        slides.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        updateDots(currentIndex);

    // 마지막(복제 슬라이드) 도달 시 → 실제 첫 슬라이드로 순간 이동
        if (currentIndex === totalSlides - 1) {
        setTimeout(() => {
            slides.style.transition = "none";
            slides.style.transform = `translateX(0)`;
            currentIndex = 0;
            updateDots(currentIndex);
            isMoving = false;
        }, 500);
        } else {
        setTimeout(() => {
            isMoving = false;
        }, 500);
        }
    }

    // 자동 슬라이드
    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(goToNextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    startAutoSlide();

    // 캐러셀에 마우스 올렸을 때 멈추고, 벗어나면 다시 시작
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // 인디케이터 클릭 → 다음 슬라이드로만 이동 가능
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const targetIndex = parseInt(dot.dataset.index);

            if (isMoving || targetIndex === currentIndex % originalSlides) return;

            isMoving = true;
            currentIndex = targetIndex;
            slides.style.transition = "transform 0.5s ease-in-out";
            slides.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
            updateDots(currentIndex);

            setTimeout(() => {
            isMoving = false;
            }, 500);
        });
    });

    updateDots(currentIndex);

});

// ----------------------------베스트메뉴 연출-----------------
    document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.bestm_box');
    const prevBtn = document.querySelector('.aro_b_left').closest('button');
    const nextBtn = document.querySelector('.aro_b_right').closest('button');
    const ITEM_WIDTH = 260; // 220 + margin 20*2
    let isMoving = false;
    let autoTimer;

    function move(dir) {
        if (isMoving) return;
        isMoving = true;

        track.style.transition = 'all 0.5s ease';
        track.style.transform = `translateX(${dir === 'next' ? -ITEM_WIDTH : ITEM_WIDTH}px)`;

        track.addEventListener('transitionend', function handler() {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';

        if (dir === 'next') {
            track.appendChild(track.firstElementChild);
        } else {
            track.insertBefore(track.lastElementChild, track.firstElementChild);
        }

        isMoving = false;
        track.removeEventListener('transitionend', handler);
        });
    }

    // 화살표 버튼
    nextBtn.addEventListener('click', () => {
        move('next');
        resetTimer(); // 수동 조작 시 자동 슬라이드 리셋
    });

    prevBtn.addEventListener('click', () => {
        move('prev');
        resetTimer();
    });

    // 자동 슬라이드
    function startAutoSlide() {
        autoTimer = setInterval(() => {
        move('next');
        }, 3000); // 3초 간격
    }

    function resetTimer() {
        clearInterval(autoTimer);
        startAutoSlide();
    }

    startAutoSlide();
    });
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
//----------------------------브랜드 연출-----------------
    document.addEventListener("DOMContentLoaded", () => {
        const card = document.querySelector(".contents_etc03");
        const btn = card.querySelector(".b_more_btn > img");
        
        card.addEventListener("mouseenter", () => {
            btn.classList.add("rotate-scale");
        });
        
        card.addEventListener("mouseleave", () => {
            btn.classList.remove("rotate-scale");
        });
    });

// ---------------------------- 메인 페이지 검색 → store.html 연동 ----------------------------
    document.addEventListener('DOMContentLoaded', () => {
    // 메인 HTML의 실제 ID에 맞춤
    const form  = document.getElementById('s_search_bar');
    const input = document.getElementById('search_bar');

    if (!form || !input) {
        console.warn('[main_search] 폼/인풋 ID 확인 필요');
        return;
    }

    // 엔터/버튼 → store.html로 이동 (검색어 있으면 ?search=)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = (input.value || '').trim();
        const url = keyword
        ? `store.html?search=${encodeURIComponent(keyword)}`
        : `store.html`;
        window.location.href = url;
    });
});
//-------메인 타이틀 및 오브젝트 페이드 연출---------------
// 홈 진입 페이드: 캐러셀 → 타이틀 순서로
    document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const bestTitle = document.querySelector('.best_menu_t');

    if (carousel) {
        carousel.classList.add('js-fade-seed', 'js-fade-zoom');
    }
    if (bestTitle) {
        bestTitle.classList.add('js-fade-seed', 'js-fade-up');
    }

    const fire = () => {
        // 캐러셀 먼저
        requestAnimationFrame(() => {
        if (carousel) carousel.classList.add('js-fade-in');
        });

        // 타이틀은 0.3초(300ms) 뒤에
        setTimeout(() => {
        if (bestTitle) bestTitle.classList.add('js-fade-in');
        }, 300);
    };

    if (document.readyState === 'complete') {
        fire();
    } else {
        window.addEventListener('load', fire, { once: true });
    }
});

// ===== 회원가입/멤버십 섹션: 스크롤 리빌 =====
document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('.m_join_root_box');
    if (!root) return;

    const logo      = root.querySelector('.m_join_logo');        // 로고: 왼→오
    const title     = root.querySelector('.m_join_title');       // 타이틀: 위→아래
    const p1        = root.querySelector('.m_join_txt');         // 안내문 1: 위→아래
    const p2        = root.querySelector('.m_join_txt2');        // 안내문 2: 위→아래
    const divider   = root.querySelector('.m_join_member_box');  // 구분선
    const noticeBox = root.querySelector('.m_join_notice');      // 공지문 영역
    const noticePs  = noticeBox ? Array.from(noticeBox.querySelectorAll('p')) : [];

    // 초기 클래스 주입
    logo      && logo.classList.add('reveal-seed', 'reveal-left');
    title     && title.classList.add('reveal-seed', 'reveal-down');
    p1        && p1.classList.add('reveal-seed', 'reveal-down');
    p2        && p2.classList.add('reveal-seed', 'reveal-down');
    divider   && divider.classList.add('divider-seed');
    noticePs.forEach(p => p.classList.add('reveal-seed', 'reveal-up'));

    // 뷰포트 감지
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            let t = 0;
            const step = (fn, delay) => setTimeout(fn, delay);

            // 로고
            if (logo) step(() => logo.classList.add('reveal-in'), t); // 0ms
            t += 100; // 200 → 100ms

            // 타이틀
            if (title) step(() => title.classList.add('reveal-in'), t);
            t += 80; // 150 → 80ms

            // 안내문 1
            if (p1) step(() => p1.classList.add('reveal-in'), t);
            t += 60; // 120 → 60ms

            // 안내문 2
            if (p2) step(() => p2.classList.add('reveal-in'), t);
            t += 80; // 150 → 80ms

            // 구분선
            if (divider) step(() => {
                divider.classList.remove('divider-seed');
                divider.classList.add('divider-in');
            }, t);
            t += 80; // 150 → 80ms

            // 공지문 (스태거)
            noticePs.forEach((p, i) => {
                step(() => p.classList.add('reveal-in'), t + i * 80); // 120 → 80ms
            });

            io.unobserve(entry.target);
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });

    io.observe(root);
});
    
// === Community 섹션 스크롤 리빌 ===
    document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.ivent_root_bg3');
    if (!section) return;

    const titleImg   = section.querySelector('.community_t');        // 왼->오 먼저
    const subTitle   = section.querySelector('.ivent_com_txt2');     // 부드러운 텍스트
    const engImg     = section.querySelector('.ivent_com_txt3');     // 아래->위
    const lineText   = section.querySelector('.ivent_com_txt4');     // 페이드만
    const moreBtn    = section.querySelector('.ivent_more_btn');     // 버튼: 페이드만
    const cardsWrap  = section.querySelector('.ivent_card_bg_g');

    // 카드들: JS가 시드 자동 부여
    const cards = cardsWrap ? Array.from(cardsWrap.querySelectorAll('.ivent_card_bg, .ivent_card_bgs')) : [];
    cards.forEach(c => c.classList.add('reveal-seed', 'reveal-up'));

    // 라인 텍스트/버튼에 시드 클래스 부여
    if (lineText) lineText.classList.add('reveal-fade');
    if (moreBtn) {
        moreBtn.classList.remove('reveal-zoom'); // 혹시 기존 줌 클래스 제거
        moreBtn.classList.add('reveal-fade');
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        let t = 0;
        const step = (fn, d) => setTimeout(fn, d);

        // 1) 타이틀 이미지
        if (titleImg) step(() => titleImg.classList.add('reveal-in'), t);
        t += 180;

        // 2) 서브 타이틀(문장)
        if (subTitle) step(() => subTitle.classList.add('reveal-in'), t);
        t += 140;

        // 3) 영문 텍스트 이미지
        if (engImg) step(() => engImg.classList.add('reveal-in'), t);
        t += 140;

        // 4) 설명 라인(페이드만)
        if (lineText) step(() => lineText.classList.add('reveal-in'), t);
        t += 140;

        // 5) "이벤트 더보기" 버튼 (페이드만)
        if (moreBtn) step(() => moreBtn.classList.add('reveal-in'), t);
        t += 200;

        // 6) 카드 그리드: 아래→위 스태거
        cards.forEach((card, i) => {
            step(() => card.classList.add('reveal-in'), t + i * 100);
        });

        io.unobserve(entry.target); // 1회만 실행
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });

    io.observe(section);
    });

        // ====== etc(스토어/가맹문의/브랜드) 섹션 진입 시 연출 ======
    document.addEventListener('DOMContentLoaded', () => {
        const etcWrap = document.querySelector('.etc_root_contents_box');
        if (!etcWrap) return;
    
        // 대상 요소들
        const storeCard     = document.querySelector('.contents_etc01'); // STORE 카드
        const franchiseCard = document.querySelector('.contents_etc02'); // 가맹문의 카드
        const brandWrap     = document.querySelector('.contents_etc03'); // BRAND 전체 박스
        const brandScope    = document.querySelector('.contents_etc03_s'); // 텍스트 묶음 영역(글씨만 이동)
        const brandTitle    = brandScope ? brandScope.querySelector('.brand_title') : null;
        const brandLine     = brandScope ? brandScope.querySelector('.line_brand') : null;
        const brandDe       = brandScope ? brandScope.querySelector('.brand_de') : null;
        const brandSizeUp   = brandScope ? brandScope.querySelector('.size_up') : null;
        const brandBtnImg   = brandWrap ? brandWrap.querySelector('.b_more_btn > img') : null; // absolute 버튼
    
        // 1) 초기 클래스 주입 (HTML 수정 없이)
        // 스토어/가맹문의: 오른쪽→왼쪽
        storeCard     && storeCard.classList.add('mv-seed', 'mv-rtl');
        franchiseCard && franchiseCard.classList.add('mv-seed', 'mv-rtl');
    
        // BRAND: "글씨만" 왼쪽→오른쪽
        [brandTitle, brandLine, brandDe, brandSizeUp].forEach(el => {
        el && el.classList.add('mv-seed', 'mv-ltr');
        });
    
        // BRAND 버튼은 absolute라서 transform만으로 부드럽게 띄움(위치값 불변)
        brandBtnImg && brandBtnImg.classList.add('mv-btn-seed');
    
        // 2) 관찰자
        const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
    
            const target = entry.target;
    
            // 등장 스태거 함수
            const step = (fn, delay = 0) => setTimeout(fn, delay);
    
            // 스토어/가맹문의: 동시에 등장
            if (target === storeCard || target === franchiseCard) {
            step(() => storeCard     && storeCard.classList.add('mv-in'), 0);
            step(() => franchiseCard && franchiseCard.classList.add('mv-in'), 80);
            io.unobserve(storeCard);
            io.unobserve(franchiseCard);
            }
    
            // BRAND 묶음: 텍스트만 순차로 LTR
            if (target === brandWrap) {
            let t = 0;
            [brandTitle, brandLine, brandDe, brandSizeUp].forEach((el) => {
                if (!el) return;
                step(() => el.classList.add('mv-in'), t);
                t += 120; // 120ms 간격으로 자연스러운 스태거
            });
    
            // 버튼 이미지(absolute): 살짝 떠오르듯
            step(() => brandBtnImg && brandBtnImg.classList.add('mv-btn-in'), t + 80);
    
            io.unobserve(brandWrap);
            }
        });
        }, {
        threshold: 0.25,
        rootMargin: '0px 0px -10% 0px'
        });
    
        // 관찰 시작
        storeCard     && io.observe(storeCard);
        franchiseCard && io.observe(franchiseCard);
        brandWrap     && io.observe(brandWrap);
    });