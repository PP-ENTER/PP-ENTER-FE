// document.addEventListener('DOMContentLoaded', () => {
//     const updateForm = document.getElementById('updateForm');
//     const editPostModal = document.getElementById('editPostModal');
//     const closeBtn = document.querySelector('.close');

//     // 수정 버튼 클릭 시 모달 창 열기
//     document.getElementById('editPostBtn').addEventListener('click', () => {
//         editPostModal.style.display = 'block';
//         fetchPostData();
//     });

//     // 모달 창 닫기 버튼 클릭 시 모달 창 닫기
//     closeBtn.addEventListener('click', () => {
//         editPostModal.style.display = 'none';
//     });

//     // 모달 창 외부 클릭 시 모달 창 닫기
//     window.addEventListener('click', (event) => {
//         if (event.target === editPostModal) {
//             editPostModal.style.display = 'none';
//         }
//     });

//     // 수정 폼 제출 시 게시물 수정 요청 보내기
//     updateForm.addEventListener('submit', (event) => {
//         event.preventDefault();
//         const formData = new FormData(updateForm);
//         const postId = getPostIdFromUrl();
//         updatePost(postId, formData);
//     });
// });

// // 게시물 데이터 가져오기
// function fetchPostData() {
//     const postId = getPostIdFromUrl();
//     fetch(`http://43.200.108.45/posts/${postId}/`)
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('title').value = data.title;
//             document.getElementById('content').value = data.content;
//             document.getElementById('tag').value = data.tag;
//         });
// }

// // 게시물 수정 요청 보내기
// function updatePost(postId, formData) {
//     fetch(`http://43.200.108.45/posts/${postId}/`, {
//         method: 'PUT',
//         body: formData
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         } else if (response.status === 403) {
//             throw new Error('작성자만 게시물을 수정할 수 있습니다.');
//         } else {
//             throw new Error('게시물 수정 중 오류가 발생했습니다.');
//         }
//     })
//     .then(data => {
//         console.log('게시물이 성공적으로 수정되었습니다.', data);
//         // 모달 창 닫기
//         document.getElementById('editPostModal').style.display = 'none';
//         // 게시물 상세 페이지 업데이트
//         updatePostDetail(data);
//     })
//     .catch(error => {
//         console.error(error.message);
//         alert(error.message);
//     });
// }

// // 게시물 상세 페이지 업데이트
// function updatePostDetail(postData) {
//     document.getElementById('postTitle').textContent = postData.title;
//     document.getElementById('postContent').textContent = postData.content;
//     document.getElementById('postTags').textContent = postData.tag;
// }

// // URL에서 게시물 ID 추출하기
// function getPostIdFromUrl() {
//     const urlParts = window.location.pathname.split('/');
//     return urlParts[urlParts.length - 1];
// }

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id"); // 'id' 쿼리 파라미터의 값을 가져옵니다.
  console.log(postId);
  if (postId) {
    // postId를 사용하여 필요한 데이터를 가져오거나 처리합니다.
    fetchPostDetail(postId);
  }
});

function fetchPostDetail(postId) {
  console.log(postId);
  fetch(`http://127.0.0.1:8000/posts/posts/${postId}/`, {
    // fetch(`http://43.200.108.45/posts/${postId}/`, {
  })
    .then((response) => response.json())
    .then((post) => {
      console.log(post.image_url);
      document.getElementById("title").value = post.photo_name;
      document.getElementById("content").textContent = post.content;
      document.getElementById("postImage").src = post.image_url;

      // console.log(post.is_author)
      // if (post.is_author) {
      //     document.getElementById('editPostBtn').style.display = 'block';
      //     document.getElementById('deletePostBtn').style.display = 'block';
      // }
    })
    .catch((error) => console.error("Error fetching post details:", error));
}

function editPost() {
  const urlParams1 = new URLSearchParams(window.location.search);
  const postId2 = urlParams1.get("id"); // 'id' 쿼리 파라미터의 값을 가져옵니다.
//   alert(postId2)

//   const fileInput = document.getElementById("photo_id");

//   alert(fileInput.files.length)

//   if (fileInput.files.length === 0) {
//     alert("이미지를 선택해주세요.!");
//     return; // 파일이 없으면 함수 실행
//   }


  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
//   const photo = document.getElementById("photo_id").files[0];
  // const tag = document.getElementById('tag').value;

  const formData = new FormData();
//   formData.append("user", 1);
  formData.append("photo_name", title);
  formData.append("content", content);
//   formData.append("image_url", photo);
  


  // fetch(`http://43.200.108.45/posts/${postId2}/`, 
  fetch(`http://127.0.0.1:8000/posts/${postId2}/`, {
    method: 'PATCH', // Use PATCH method to update parts of the post
    body: formData, // FormData object which includes file if selected
  })
    .then((response) => {
      if (response.ok) {
        console.log("Post updated successfully!");
        alert("Post updated successfully!");
      } else {
        throw new Error("Failed to update the post");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    //   alert("Error updating the post.");
    });
}

function deletePost() {
  const urlParams1 = new URLSearchParams(window.location.search);
  const postId1 = urlParams1.get("id"); // 'id' 쿼리 파라미터의 값을 가져옵니다.

  // fetch(`http://43.200.108.45/posts/${postId1}/`, { method: 'DELETE' })
  fetch(`http://127.0.0.1:8000/posts/${postId1}/`, {
    method: "DELETE", // HTTP 메소드 DELETE를 사용하여 리소스 삭제
  })
    .then((response) => {
      if (response.ok) {
        alert("게시물이 삭제되었습니다.");
        window.location.href = "post_list.html";
      } else {
        throw new Error("Failed to delete the post");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
