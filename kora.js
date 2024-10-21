const startButton = document.querySelector('.start-button');

if (startButton) {
  startButton.addEventListener('click', () => {
    window.location.replace('Kora.html');
  });
} else {
  console.error('Start button not found');
}
