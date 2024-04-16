document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');

    postForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const photo = document.getElementById('photo_id').files[0];
        // const tag = document.getElementById('tag').value;

        const formData = new FormData();
        formData.append('user', 1);
        formData.append('photo_name', title);
        formData.append('content', content);
        formData.append('image_url', photo);
        // formData.append('tag', tag);

        try {
            fetch('http://127.0.0.1:8000/posts/create/', {
            // const response = await fetch('http://43.200.108.45/posts/create/', {
                method: 'POST',
                body: formData,
                // headers: {
                //     'X-CSRFToken': document.querySelector('[name=csrf-token]').content,
                // },
            });

            // if (response.ok) {
            //     // alert('게시물이 성공적으로 생성되었습니다.');
            //     window.location.href = 'post_list.html';
            // } else {
            //     // alert('게시물 생성에 실패했습니다.');
            //     window.location.href = 'post_list.html';
            // }

            alert('게시물이 성공적으로 생성되었습니다.');
            window.location.href = 'post_list.html';
        } catch (error) {
            console.error('Error:', error);
            alert('게시물 생성 중 오류가 발생했습니다.');
        }
    });
});