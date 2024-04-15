document.addEventListener('DOMContentLoaded', function() {

  const postForm = document.getElementById('postForm');
  const csrftoken = document.querySelector('[name=csrf-token]').content;
  
  postForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // const formData = new FormData();
    // // formData.append('user_id', 1);
    // // formData.append('face_chat_id', 1);
    // formData.append('image_url', document.getElementById('photo_id').files[0]);
    // formData.append('photo_name', document.getElementById('title').value);
    // formData.append('content', document.getElementById('content').value);

    const formData = {
        image_url : document.getElementById('photo_id').files[0],
        photo_name : document.getElementById('title').value,
        content : document.getElementById('content').value
    }

    const token = localStorage.getItem('accessToken');  // 로그인 후 저장된 토큰을 사용합니다.
    if (!token) {
        alert('로그인이 필요합니다.');
        return; // 토큰이 없다면 함수를 종료합니다.
      }

    fetch('http://127.0.0.1:8000/posts/create/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
        },
        // body: formData
        body: JSON.stringify(formData)
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