window.addEventListener('load', function() {
  const postForm = document.getElementById('postForm');

  postForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const photo = document.getElementById('photo').files[0];
    const tags = document.getElementById('tag').value.split(',').map(tag => tag.trim());
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('photo', photo);
    tags.forEach(tag => formData.append('tag', tag));

    // 로컬 스토리지에서 access 토큰 가져오기
    const accessToken = localStorage.getItem('accessToken');

    fetch('http://43.200.108.45:8000/posts/create/', { 
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      body: formData
    })
    .then(response => {
      // 서버에서 JSON 응답을 반환하는 경우
      if (response.ok) {
        return response.json();
      } else {
        // 서버에서 HTML 문서 응답을 반환하는 경우
        return response.text().then(text => {
          throw new Error(`HTTP error! status: ${response.status}\n${text}`);
        });
      }
    })
    .then(data => {
      // JSON 데이터 처리
      const postId = data.id;
      window.location.href = `/post_detail.html?postId=${postId}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
});