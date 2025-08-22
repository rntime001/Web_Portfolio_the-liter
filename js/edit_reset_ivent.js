//-----------------------------유효성 검사-------------------

document.addEventListener("DOMContentLoaded", () => {
  // Quill 에디터 1회만 초기화
  const quill = new Quill('#editor', {
      theme: 'snow'
  });

  const form = document.getElementById("write_form");
  const wishTitle = document.getElementById("wish_title");
  const postTitle = document.getElementById("post_title");
  const hiddenTextarea = document.querySelector("textarea[name='content']");

  form.addEventListener("submit", function (e) {
      e.preventDefault(); // 서버 전송 막기

      const contentText = quill.getText().trim(); // 텍스트 추출

      // 유효성 검사

      if (postTitle.value.trim() === "") {
          alert("제목을 입력하세요.");
          postTitle.focus();
          return;
      }

      if (contentText === "") {
          alert("내용을 입력하세요.");
          quill.focus();
          return;
      }

      // 숨겨진 textarea에 HTML 넣기 (전송 대비)
      hiddenTextarea.value = quill.root.innerHTML;

      // 구라 작성 완료 처리
      alert("작성 완료되었습니다!");
      window.location.href = "ivent.html";
  });
});

 // 폼 제출 시 에디터 내용을 textarea에 복사

window.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('write_form');
  const hiddenContent = document.getElementById('hidden_content');

  form.addEventListener('submit', function () {
    hiddenContent.value = quill.root.innerHTML;
  });
});

