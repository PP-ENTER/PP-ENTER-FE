const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const signupLink = document.getElementById('signup-link');

document.addEventListener('DOMContentLoaded', function () {
  console.log('문서가 로드되었습니다.');
  var signupButton = document.getElementById('signup-link');
  console.log(signupButton); // 버튼 요소가 올바르게 선택되었는지 확인
  signupButton.addEventListener('click', function () {
      console.log('회원가입 버튼이 클릭되었습니다.'); // 클릭 이벤트가 발생하는지 확인
      window.location.href = '../../accounts/register.html';
  });
});


loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  const loginUrl = 'http://127.0.0.1:8000/accounts/login/';

  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('로그인 성공:', data);

      // 사용자 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', data.access);
      alert(data.access);

      // 예시: 사용자를 홈페이지로 리디렉션
      window.location.href = '../posts/post_list.html';
    } else {
      const error = await response.json();
      console.error('로그인 실패:', error);
      showModal(error.message || '로그인에 실패했습니다.');
    }
  } catch (error) {
    console.error('네트워크 오류:', error);
    showModal('네트워크 오류가 발생했습니다.');
  }
});

// 회원가입 링크 클릭 이벤트 리스너
signupLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'accounts/register'; // 회원가입 페이지 URL
  });

// 모달을 표시하는 함수
function showModal(message) {
  const errorModal = document.getElementById('errorModal');
  const errorMessage = document.getElementById('errorMessage');

  errorMessage.textContent = message;
  errorModal.classList.remove('hidden');
}

// 모달을 숨기는 함수
function closeModal() {
  document.getElementById('errorModal').classList.add('hidden');
}