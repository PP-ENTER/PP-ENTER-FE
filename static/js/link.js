document.addEventListener('DOMContentLoaded', function () {
    // '더보기' 링크에 대한 클릭 이벤트 리스너를 설정합니다.
    const moreLink = document.getElementById('moreLink');
    moreLink.addEventListener('click', function (event) {
      console.log("더보기 클릭됨"); // 디버깅 메시지
      event.preventDefault(); // 기본 동작을 막습니다.

      // 사용자 ID를 설정합니다. 실제 애플리케이션에서는 이 값을 동적으로 설정해야 합니다.
      const userId = 0; // 예시로 1을 사용

      // 사용자 ID를 포함하여 post_detail.html로 리다이렉트합니다.
      window.location.href = `post_detail.html?userId=${userId}`;
    });
  });