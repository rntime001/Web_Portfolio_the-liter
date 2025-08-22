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
    const agreeForm = document.getElementById("agree_root_box");
    const agreeAll = document.getElementById("agree"); // 전체 동의
    const agreeTerms = document.getElementById("agree2"); // 이용약관 동의 (필수)
    const agreePrivacy = document.getElementById("agree3"); // 개인정보 수집 동의 (필수)
    const agreeAge = document.getElementById("agree4"); // 만 14세 이상 (필수)

    // 전체 동의 클릭 시 나머지 동의도 함께 체크/해제
    agreeAll.addEventListener("change", () => {
        const allChecked = agreeAll.checked;
        agreeTerms.checked = allChecked;
        agreePrivacy.checked = allChecked;
        agreeAge.checked = allChecked;
    });

    // 개별 체크박스 상태에 따라 전체 동의 체크 여부 갱신
    [agreeTerms, agreePrivacy, agreeAge].forEach(chk => {
        chk.addEventListener("change", () => {
            agreeAll.checked = (agreeTerms.checked && agreePrivacy.checked && agreeAge.checked);
        });
    });

    // 가입하기 버튼 클릭 시 유효성 검사
    const joinBtn = document.querySelector(".join_button");
    joinBtn.addEventListener("click", (e) => {
        if (!agreeTerms.checked) {
            alert("이용약관에 동의해야 합니다.");
            e.preventDefault();
            return;
        }
        if (!agreePrivacy.checked) {
            alert("개인정보 수집 및 이용에 동의해야 합니다.");
            e.preventDefault();
            return;
        }
        if (!agreeAge.checked) {
            alert("만 14세 이상만 가입할 수 있습니다.");
            e.preventDefault();
            return;
        }
        // 모든 필수 동의 완료 → join_member.html로 이동 허용
    });
});