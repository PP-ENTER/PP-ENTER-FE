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
  // fetch(`http://127.0.0.1:8000/posts/posts/${postId}/`, {
    fetch(`http://43.201.47.166/posts/posts/${postId}/`, {
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
//   const fileInput = document.getElementById("photo_id");
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
  


fetch(`http://43.201.47.166/posts/${postId2}/`, {
  // fetch(`http://127.0.0.1:8000/posts/${postId2}/`, {
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
  
  fetch(`http://43.201.47.166/posts/${postId1}/`, {
  // fetch(`http://127.0.0.1:8000/posts/${postId1}/`, {
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