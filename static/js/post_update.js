document.addEventListener('DOMContentLoaded', () => {
    const updateForm = document.getElementById('updateForm');
    const editPostModal = document.getElementById('editPostModal');
    const closeBtn = document.querySelector('.close');

    // 수정 버튼 클릭 시 모달 창 열기
    document.getElementById('editPostBtn').addEventListener('click', () => {
        editPostModal.style.display = 'block';
        fetchPostData();
    });

    // 모달 창 닫기 버튼 클릭 시 모달 창 닫기
    closeBtn.addEventListener('click', () => {
        editPostModal.style.display = 'none';
    });

    // 모달 창 외부 클릭 시 모달 창 닫기
    window.addEventListener('click', (event) => {
        if (event.target === editPostModal) {
            editPostModal.style.display = 'none';
        }
    });

    // 수정 폼 제출 시 게시물 수정 요청 보내기
    updateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(updateForm);
        const postId = getPostIdFromUrl();
        updatePost(postId, formData);
    });
});

// 게시물 데이터 가져오기
function fetchPostData() {
    const postId = getPostIdFromUrl();
    fetch(`http://43.200.108.45/posts/${postId}/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').value = data.title;
            document.getElementById('content').value = data.content;
            document.getElementById('tag').value = data.tag;
        });
}

// 게시물 수정 요청 보내기
function updatePost(postId, formData) {
    fetch(`http://43.200.108.45/posts/${postId}/`, {
        method: 'PUT',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 403) {
            throw new Error('작성자만 게시물을 수정할 수 있습니다.');
        } else {
            throw new Error('게시물 수정 중 오류가 발생했습니다.');
        }
    })
    .then(data => {
        console.log('게시물이 성공적으로 수정되었습니다.', data);
        // 모달 창 닫기
        document.getElementById('editPostModal').style.display = 'none';
        // 게시물 상세 페이지 업데이트
        updatePostDetail(data);
    })
    .catch(error => {
        console.error(error.message);
        alert(error.message);
    });
}

// 게시물 상세 페이지 업데이트
function updatePostDetail(postData) {
    document.getElementById('postTitle').textContent = postData.title;
    document.getElementById('postContent').textContent = postData.content;
    document.getElementById('postTags').textContent = postData.tag;
}

// URL에서 게시물 ID 추출하기
function getPostIdFromUrl() {
    const urlParts = window.location.pathname.split('/');
    return urlParts[urlParts.length - 1];
}