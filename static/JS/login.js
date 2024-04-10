const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginBtn.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        // 로그인 성공 처리
        const data = await response.json();
        console.log('로그인 성공:', data);
      
        // 사용자 토큰을 로컬 스토리지에 저장
        localStorage.setItem('userToken', data.token);
      
        // 예시: 사용자를 홈페이지로 리디렉션
        window.location.href = '/main'; //일단은 /main으로 지정
      }
    else {
      // 로그인 실패 처리
      const error = await response.json();
      console.error('로그인 실패:', error);
      alert(error.message || '로그인에 실패했습니다.');
    }
  } catch (error) {
    console.error('네트워크 오류:', error);
  }
  // 모달을 표시하는 함수
function showModal() {
    document.getElementById('errorModal').classList.remove('hidden');
  }
  
  // 모달을 숨기는 함수
function closeModal() {
    document.getElementById('errorModal').classList.add('hidden');
  }
});