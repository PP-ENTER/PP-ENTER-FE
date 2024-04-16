function fetchPosts() {

    fetch('http://127.0.0.1:8000/posts/posts_main_list/') // 서버에서 게시글 리스트를 가져오는 URL로 변경하세요.
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cardSlider');
            data.forEach(post => {
                const card = createCardElement(post);
                container.appendChild(card);
            });
            initializeSlider();
        })
        .catch(error => {
            console.error('Fetching error:', error);
        });
}

document.addEventListener('DOMContentLoaded', fetchPosts);

function createCardElement(post) {
    // 카드 컨테이너 생성
    const card = document.createElement('div');
    card.className = 'w-64 h-80 mr-4 bg-white rounded-lg border border-gray-300';
    card.style.minWidth = '16rem';

    // 이미지 생성
    const image = document.createElement('img');
    image.className = 'w-full h-48 rounded-t-lg object-cover';
    image.src = post.image_url || 'https://via.placeholder.com/256x128'; // 이미지 URL이 없는 경우 기본값
    image.alt = 'Post Image';
    card.appendChild(image);

    // 본문 컨테이너 생성
    const body = document.createElement('div');
    body.className = 'p-4';
    card.appendChild(body);

    // 제목 생성
    const title = document.createElement('h5');
    title.className = 'text-lg font-semibold mb-2';
    title.textContent = post.photo_name || 'Card Title'; // 제목이 없는 경우 기본값
    body.appendChild(title);

    // 조회수 생성
    const count = document.createElement('p');
    count.className = 'text-gray-600 text-sm';
    count.textContent = `조회수: ${post.count}`;
    body.appendChild(count);

    // 생성일자 생성
    const createdAt = document.createElement('p');
    createdAt.className = 'text-gray-600 text-sm';
    createdAt.textContent = `생성일자: ${new Date(post.created_at).toLocaleDateString()}`;
    body.appendChild(createdAt);

    // 좋아요 및 태그 정보는 주석 처리된 부분에 따라 추가할 수 있습니다.
    // 예시 코드에서는 해당 부분을 생략했습니다.
    // 해당 정보를 추가하려면, 각각에 대한 정보를 post 객체에서 추출하여
    // 생성된 요소에 클래스를 할당하고 card 또는 body에 appendChild 메서드를 사용하여 추가합니다.

    return card;
}


function initializeSlider() {
    let currentIndex = 0;
    const slider = document.getElementById('cardSlider');
    const cards = slider.children;
    const totalCards = cards.length;
    // 각 카드의 너비를 계산 (첫 번째 카드 기준)
    const cardWidth = cards[0] ? cards[0].offsetWidth + 16 : 0; // 마진 포함

    document.getElementById('main-slideLeft').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    document.getElementById('main-slideRight').addEventListener('click', function() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    function updateSliderPosition() {
        const newTranslateX = -(cardWidth * currentIndex);
        slider.style.transform = `translateX(${newTranslateX}px)`;
    }
}