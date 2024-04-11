document.getElementById('createRoomBtn').addEventListener('click', function() {
    const roomName = prompt("방 이름을 입력하세요:");
    if (roomName) {
        fetch('http://localhost:8000/facechats/create_facechat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 여기에 CSRF 토큰 추가 필요
            },
            body: JSON.stringify({
                host_id: 1,
                room_name: roomName
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // 서버 응답에서 방의 id를 추출
            const roomId = data.id;
            // 방 id를 URL에 포함시켜 리다이렉트
            window.location.href = `/facechats/facechat.html?roomId=${roomId}`;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
