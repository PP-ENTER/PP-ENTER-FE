document.addEventListener('DOMContentLoaded', () => {
    const createPostBtn = document.getElementById('createPostBtn');
  
    createPostBtn.addEventListener('click', () => {
      // 로그인한 사용자인지 확인
      const isLoggedIn = checkUserLogin();
  
      if (isLoggedIn) {
        // 게시글 작성 페이지로 이동
        window.location.href = '/posts/post_create.html';
      } else {
        // 메인 페이지로 이동
        window.location.href = '/posts/post_list.html';
      }
    });
  
    function checkUserLogin() {
        // 로컬 스토리지에서 JWT 토큰 가져오기
        const token = localStorage.getItem('token');
    
        if (token) {
          // 서버에 JWT 토큰을 포함하여 로그인 상태 확인 API 호출
          return fetch('/api/check-login', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          })
            .then(response => response.json())
            .then(data => {
              return data.isLoggedIn;
            })
            .catch(error => {
              console.error('로그인 상태 확인 중 오류가 발생했습니다.', error);
              return false;
            });
        } else {
          // 토큰이 없으면 로그인되지 않은 상태로 간주
          return Promise.resolve(false);
        }
      }
    });