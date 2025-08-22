// ---------------------------- 탑버튼 연출 ----------------------------
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

// ----------------------------- 유효성 검사 + 말풍선 -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    const form    = document.getElementById("join_total_box");

    const name    = document.getElementById("u_name");
    const mobile1 = document.getElementById("mobile1");
    const mobile2 = document.getElementById("mobile2");
    const mobile3 = document.getElementById("mobile3");
    const email   = document.getElementById("email");
    const address = document.getElementById("address");
    const cost    = document.getElementById("cost_join");
    const title   = document.getElementById("u_title");
    const detail  = document.getElementById("u_detail");
    const agree   = document.getElementById("agree");

    // 숫자/길이 제한
    const onlyDigits = v => v.replace(/\D/g, "");
    mobile1.addEventListener("input", () => mobile1.value = onlyDigits(mobile1.value).slice(0,3));
    mobile2.addEventListener("input", () => mobile2.value = onlyDigits(mobile2.value).slice(0,4));
    mobile3.addEventListener("input", () => mobile3.value = onlyDigits(mobile3.value).slice(0,4));

    // 패턴
    const mobilePattern1 = /^\d{3}$/; // 3자리
    const mobilePattern2 = /^\d{4}$/; // 4자리
    const mobilePattern3 = /^\d{4}$/; // 4자리
    const emailPattern   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ===== 툴팁 유틸 =====
    let currentTooltip = null;

    function showTooltip(inputEl, message) {
        removeTooltip();

        // 툴팁을 join_de_box 기준으로 띄우기
        const joinDeBox = document.querySelector(".join_de_box");
        if (!joinDeBox) return; // join_de_box가 없으면 중단

        // 기준 박스와 input 위치 계산
        const boxRect = joinDeBox.getBoundingClientRect();
        const rect    = inputEl.getBoundingClientRect();

        // join_de_box 내부 좌표 기준 (absolute 위치 계산)
        // 👉 input 왼쪽 위 좌표를 기준으로
        const top  = rect.top - boxRect.top;
        const left = rect.left - boxRect.left;

        // 엘리먼트 생성
        const tip = document.createElement("div");
        tip.className = "error-tooltip";
        tip.setAttribute("role", "alert");
        tip.setAttribute("aria-live", "assertive");
        tip.textContent = message;

        // join_de_box 안에 추가
        joinDeBox.appendChild(tip);
        tip.style.position = "absolute";
        tip.style.top = `${top}px`;
        tip.style.left = `${left}px`;

        // 기본 위치는 "왼쪽 위"에 붙고,
        // 세부 위치 보정은 CSS(.error-tooltip)에 margin/transform으로 제어 가능

        // input 강조
        inputEl.classList.add("input-error");

        currentTooltip = { tip, inputEl };

        // 스크롤/리사이즈 시 툴팁 위치 재계산 (1회성)
        const reposition = () => {
            const r = inputEl.getBoundingClientRect();
            const boxR = joinDeBox.getBoundingClientRect();
            tip.style.top = `${r.top - boxR.top}px`;
            tip.style.left = `${r.left - boxR.left}px`;
        };
        window.addEventListener("scroll", reposition, { passive: true, once: true });
        window.addEventListener("resize", reposition, { passive: true, once: true });
    }

    function removeTooltip() {
        if (currentTooltip) {
            currentTooltip.inputEl.classList.remove("input-error");
            currentTooltip.tip.remove();
            currentTooltip = null;
        }
    }

    // 입력 변경/blur 시 툴팁 제거
    [name, mobile1, mobile2, mobile3, email, address, cost, title, detail].forEach(el => {
        if (!el) return;
        el.addEventListener("input", () => {
            if (currentTooltip && currentTooltip.inputEl === el) removeTooltip();
        });
        el.addEventListener("blur", () => {
            if (currentTooltip && currentTooltip.inputEl === el) removeTooltip();
        });
    });

    // 제출 처리
    form.addEventListener("submit", function (e) {
        removeTooltip();

        // 한글 이름 패턴 (2~10자, 자음/모음 단독 입력 방지)
        const namePattern = /^[가-힣]{2,10}$/;

        // 1) 성명
        if (!name.value.trim()) {
            e.preventDefault();
            showTooltip(name, "성명을 입력해주세요.");
            name.focus({ preventScroll: true });
            name.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }
        if (!namePattern.test(name.value.trim())) {
            e.preventDefault();
            showTooltip(name, "성명은 한글 2~10자만 입력 가능합니다.");
            name.focus({ preventScroll: true });
            name.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }

        // 2) 전화번호
        if (!mobile1.value.trim() || !mobile2.value.trim() || !mobile3.value.trim()) {
            e.preventDefault();
            showTooltip(mobile1, "전화번호를 모두 입력해주세요.");
            mobile1.focus({ preventScroll: true });
            mobile1.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }
        if (!mobilePattern1.test(mobile1.value.trim())) {
            e.preventDefault();
            showTooltip(mobile1, "앞 칸은 숫자 3자리여야 합니다.");
            mobile1.focus({ preventScroll: true });
            mobile1.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }
        if (!mobilePattern2.test(mobile2.value.trim())) {
            e.preventDefault();
            showTooltip(mobile2, "가운데 칸은 숫자 4자리여야 합니다.");
            mobile2.focus({ preventScroll: true });
            mobile2.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }
        if (!mobilePattern3.test(mobile3.value.trim())) {
            e.preventDefault();
            showTooltip(mobile3, "마지막 칸은 숫자 4자리여야 합니다.");
            mobile3.focus({ preventScroll: true });
            mobile3.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }

        // 3) 이메일
        if (!email.value.trim()) {
            e.preventDefault();
            showTooltip(email, "이메일을 입력해주세요.");
            email.focus({ preventScroll: true });
            email.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }
        if (!emailPattern.test(email.value.trim())) {
            e.preventDefault();
            showTooltip(email, "유효한 이메일 형식이 아닙니다.");
            email.focus({ preventScroll: true });
            email.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }

        // 4) 주소
        if (!address.value.trim()) {
            e.preventDefault();
            showTooltip(address, "창업 희망 지역을 입력해주세요.");
            address.focus({ preventScroll: true });
            address.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }

        // 5) 비용
        if (!cost.value) {
            e.preventDefault();
            showTooltip(cost, "창업 희망 비용을 선택해주세요.");
            cost.focus({ preventScroll: true });
            cost.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }

        // 6) 제목
        if (!title.value.trim()) {
            e.preventDefault();
            showTooltip(title, "제목을 입력해주세요.");
            title.focus({ preventScroll: true });
            title.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }

        // 7) 내용
        if (!detail.value.trim()) {
            e.preventDefault();
            showTooltip(detail, "내용을 입력해주세요.");
            detail.focus({ preventScroll: true });
            detail.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }

        // 8) 개인정보 동의
        if (!agree.checked) {
            e.preventDefault();
            showTooltip(agree, "개인정보 수집 및 이용에 동의해주세요.");
            agree.focus({ preventScroll: true });
            agree.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }

        // 실제 제출은 하지 않고 안내 후 이동 (요구사항 유지)
        e.preventDefault();
        removeTooltip();
        alert("접수되었습니다.");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 100);
    });
});
