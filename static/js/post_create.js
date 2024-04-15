document.addEventListener('DOMContentLoaded', function() {

  const csrftoken = document.querySelector('[name=csrf-token]').content;
  
  postForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image_url', document.getElementById('photo').files[0]);
    formData.append('photo_name', document.getElementById('title').value);
    formData.append('content', document.getElementById('content').value);

    const token = localStorage.getItem('accessToken');  // 로그인 후 저장된 토큰을 사용합니다.
  
    formData.append('csrfmiddlewaretoken', csrfToken);

    fetch('http://127.0.0.1:8000/posts/create/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert('Photo uploaded successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
});