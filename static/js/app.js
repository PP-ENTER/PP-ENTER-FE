// 로컬 스토리지에서 액세스 토큰 가져오는 함수
function getAccessToken() {
    return localStorage.getItem('access_token');
  }
  
  // 액세스 토큰의 유효성을 확인하는 함수
  function isTokenValid(token) {
    if (!token) {
      return false;
    }
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // exp는 초 단위이므로 밀리초로 변환
    const currentTime = new Date().getTime();
    
    return currentTime < expirationTime;
  }
  
  // 로그인 상태를 확인하는 함수
  function isLoggedIn() {
    const accessToken = getAccessToken();
    return isTokenValid(accessToken);
  }
  
  // 로그인 상태에 따라 UI를 업데이트하는 함수
  function updateUI() {
    const loggedIn = isLoggedIn();
    if (loggedIn) {
      // 로그인 상태일 때 UI 업데이트
      // 예: 로그아웃 버튼 표시, 프로필 정보 표시 등
    } else {
      // 로그아웃 상태일 때 UI 업데이트
      // 예: 로그인 버튼 표시, 게스트 모드 표시 등
    }
  }
  
  // 페이지 로드 시 로그인 상태 확인 및 UI 업데이트
  window.onload = function() {
    updateUI();
  };