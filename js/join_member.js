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
//-----------------------------유효성 검사-----------------------------
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("m_join_form");

    form.addEventListener("submit", function (e) {
        const mobile = document.getElementById("mobile");
        const email = document.getElementById("email");
        const password = document.getElementById("user_password");
        const passwordConfirm = document.getElementById("user_password_confirm");
        const username = document.getElementById("user_name");
        const errorBox = document.getElementById("form_error_box");

        // 전화번호: 숫자만, 10~11자
        const mobilePattern = /^01[016789]\d{7,8}$/;

        // 이메일: 간단한 형식 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 비밀번호: 6자 이상
        if (!mobile.value.trim()) {
            alert("전화번호를 입력해주세요.");
            mobile.focus();
            e.preventDefault();
            return;
        } else if (!mobilePattern.test(mobile.value.trim())) {
            alert("유효한 전화번호를 입력해주세요. (예: 01012345678)");
            mobile.focus();
            e.preventDefault();
            return;
        }

        if (!email.value.trim()) {
            alert("이메일을 입력해주세요.");
            email.focus();
            e.preventDefault();
            return;
        } else if (!emailPattern.test(email.value.trim())) {
            alert("유효한 이메일 형식을 입력해주세요.");
            email.focus();
            e.preventDefault();
            return;
        }

        if (!password.value) {
            alert("비밀번호를 입력해주세요.");
            password.focus();
            e.preventDefault();
            return;
        } else if (password.value.length < 8) {
            alert("비밀번호는 8자 이상이어야 합니다.");
            password.focus();
            e.preventDefault();
            return;
        }

        if (!passwordConfirm.value) {
            alert("비밀번호 확인을 입력해주세요.");
            passwordConfirm.focus();
            e.preventDefault();
            return;
        } else if (password.value !== passwordConfirm.value) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            passwordConfirm.focus();
            e.preventDefault();
            return;
        }

        if (!username.value.trim()) {
            alert("이름을 입력해주세요.");
            username.focus();
            e.preventDefault();
            return;
        }

        // 모든 조건 통과 시 submit 진행
        // alert("가입 정보를 확인했습니다."); → 실제로는 이 alert 생략

//-----------------------------에러박스 추가-----------------------------

        if (!email.value.trim()) {
            errorBox.innerText = "이메일을 입력해주세요.";
            email.focus();
            e.preventDefault();
            return;
        }

        // 모든 조건 만족 시, 실제 제출은 하지 않고 안내만 띄움
        alert("회원가입이 완료되었습니다.");
        e.preventDefault();

        setTimeout(() => {
            window.location.href = "index.html"; // 메인페이지 경로로 수정
        }, 100);


    });
});