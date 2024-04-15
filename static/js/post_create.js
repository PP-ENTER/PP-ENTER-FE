window.onload = function() {
  document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const photo = document.getElementById('photo').files[0];
    const tags = document.getElementById('tag').value.split(',').map(tag => tag.trim());

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('photo', photo);
    tags.forEach(tag => formData.append('tags', tag));

    // 로컬 스토리지에서 access 토큰 가져오기
    const accessToken = localStorage.getItem('accessToken');

    fetch('http://localhost:8000/posts/post_create/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      body: formData
    })
    .then(response => {
      if (response.status === 401) {
        // access 토큰이 만료되었을 경우 refresh 토큰을 사용하여 새로운 access 토큰 발급받기
        const refreshToken = localStorage.getItem('refreshToken');
        return fetch('http://localhost:8000/token/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh: refreshToken
          })
        })
        .then(response => response.json())
        .then(data => {
          // 새로 발급받은 access 토큰 저장
          localStorage.setItem('accessToken', data.access);
          // 새로운 access 토큰으로 다시 요청 보내기
          return fetch('http://localhost:8000/posts/post_create/', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + data.access
            },
            body: formData
          });
        });
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      const postId = data.id;
      window.location.href = `/post_detail.html?postId=${postId}`;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
};