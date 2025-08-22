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
// 유효성 검사

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login_root_box");
    const userId = document.getElementById("user_id");
    const userPw = document.getElementById("user_password");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // 실제 전송 막기 (로그인 문구를 출력을 위한)

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 아이디 빈칸 체크
        if (userId.value.trim() === "") {
            alert("아이디를 입력해주세요.");
            userId.focus();
            return;
        }

        // 이메일 형식 체크
        if (!emailPattern.test(userId.value.trim())) {
            alert("아이디는 이메일 형식으로 입력해주세요.\n예: theliter@theliter.com");
            userId.focus();
            return;
        }

        // 비밀번호 빈칸 체크
        if (userPw.value.trim() === "") {
            alert("비밀번호를 입력해주세요.");
            userPw.focus();
            return;
        }

        // 비밀번호 길이 체크
        if (userPw.value.trim().length < 8) {
            alert("비밀번호는 8자 이상 입력해주세요.");
            userPw.focus();
            return;
        }

        // 모든 조건 통과 → 허구 로그인 성공
        alert("로그인 성공!");
        location.href = "index.html"; 
    });
});  