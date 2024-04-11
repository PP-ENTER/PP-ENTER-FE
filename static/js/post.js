let currentIndex = 0;
const cardSlider = document.getElementById('cardSlider');
const cards = cardSlider.children;
const cardWidth = cards[0]
  ?.offsetWidth + 16; // 16px for margin-right

document
  .getElementById('main-slideLeft')
  .addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

document
  .getElementById('main-slideRight')
  .addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });

function updateSliderPosition() {
  const newTranslateX = -(cardWidth * currentIndex);
  cardSlider.style.transform = `translateX(${newTranslateX}px)`;
}