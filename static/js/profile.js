document.addEventListener('DOMContentLoaded', () => {
    // 로그인한 사용자의 프로필 정보를 가져오는 함수
    function fetchUserProfile() {
      // 서버에서 사용자 프로필 정보를 가져오는 API 호출
      fetch('/api/user-profile')
        .then(response => response.json())
        .then(data => {
          // 프로필 정보를 화면에 표시하는 함수 호출
          displayUserProfile(data);
        })
        .catch(error => {
          console.error('프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
        });
    }
  
    // 프로필 정보를 화면에 표시하는 함수
    function displayUserProfile(profile) {
      // 프로필 정보를 HTML 요소에 삽입
      document.getElementById('username').textContent = profile.username;
      document.getElementById('email').textContent = profile.email;
      // 추가적인 프로필 정보 표시
    }
  
    // 즐겨찾기한 영상통화방 목록을 가져오는 함수
    function fetchFavoriteRooms() {
      // 서버에서 즐겨찾기한 영상통화방 목록을 가져오는 API 호출
      fetch('/api/favorite-rooms')
        .then(response => response.json())
        .then(data => {
          // 즐겨찾기한 영상통화방 목록을 화면에 표시하는 함수 호출
          displayFavoriteRooms(data);
        })
        .catch(error => {
          console.error('즐겨찾기한 영상통화방 목록을 가져오는 중 오류가 발생했습니다.', error);
        });
    }
  
    // 즐겨찾기한 영상통화방 목록을 화면에 표시하는 함수
    function displayFavoriteRooms(rooms) {
      const favoriteRoomsList = document.getElementById('favorite-rooms-list');
      // 즐겨찾기한 영상통화방 목록을 HTML 요소에 삽입
      rooms.forEach(room => {
        const listItem = document.createElement('li');
        listItem.textContent = room.name;
        favoriteRoomsList.appendChild(listItem);
      });
    }
  
    // 영상통화 걸기 버튼 클릭 이벤트 처리
    document.getElementById('start-video-call-btn').addEventListener('click', () => {
      // 영상통화 걸기 기능 구현
      // ...
    });
  
    // 친구 추가하기 버튼 클릭 이벤트 처리
    document.getElementById('add-friend-btn').addEventListener('click', () => {
      // 친구 추가하기 기능 구현
      // ...
    });
  
    // 스크린샷한 사진 더보기 버튼 클릭 이벤트 처리
    document.getElementById('view-more-screenshots-btn').addEventListener('click', () => {
      // 스크린샷한 사진 더보기 기능 구현
      // ...
    });
  
    // 지난 기록 더보기 버튼 클릭 이벤트 처리
    document.getElementById('view-more-history-btn').addEventListener('click', () => {
      // 지난 기록 더보기 기능 구현
      // ...
    });
  
    // 로그아웃 버튼 클릭 이벤트 처리
    document.getElementById('logout-btn').addEventListener('click', () => {
      // 서버에 로그아웃 요청을 보내는 API 호출
      fetch('/api/logout', {
        method: 'POST'
      })
        .then(response => {
          // 로그아웃 성공 시 post_list.html로 이동
          window.location.href = '../../posts/post_list.html';
        })
        .catch(error => {
          console.error('로그아웃 중 오류가 발생했습니다.', error);
        });
    });
  
    // 페이지 로드 시 프로필 정보와 즐겨찾기한 영상통화방 목록을 가져옴
    fetchUserProfile();
    fetchFavoriteRooms();
  });