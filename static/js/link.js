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

    // login()
  });

  function login() {
    // 사용자에게 이름을 입력받습니다.
    var userName = prompt("Please enter your name:", "");
  
    // 사용자가 'Cancel'을 누르면 prompt()는 null을 반환합니다.
    if (userName === null || userName === "") {
      alert("User cancelled the login.");
    } else {
      let ws_scheme = window.location.protocol == "https:" ? "wss://" : "ws://";
      const serverHost = '127.0.0.1:8000';
      
      callSocket = new WebSocket(
          ws_scheme
          + serverHost
          + '/ws/call/'
      );
      console.log(  ws_scheme
          + serverHost
          + '/ws/call/')
  
  
      // 로그인을 강제로 하는듯
      callSocket.onopen = event =>{
      //let's send myName to the socket
          callSocket.send(JSON.stringify({
              type: 'login',
              data: {
                  name: userName
              }
          }));
      }
  
    }
  }