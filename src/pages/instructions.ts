export function initInstructionsPage(params: { goTo: (path: string) => void }) {
  const div = document.createElement('div');
  div.innerHTML = `
    <p class="instructions-text">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
    <button-el class="play-button">¡Jugar!</button-el>
    <div class="hands-container">
      <hand-el type="tijera"></hand-el>
      <hand-el type="piedra"></hand-el>
      <hand-el type="papel"></hand-el>
    </div>
  `;

  div.classList.add('instructions-container');
  const style = document.createElement('style');
  style.innerHTML = `
    .instructions-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      text-align: center;
    }
    .instructions-text {
      font-size: 40px;
      text-align: center;
      color: #000000;
      line-height: 1.2;
      max-width: 320px;
    }
    .play-button {
      width: 100%;
      max-width: 322px;
    }
    .hands-container {
      display: flex;
      gap: 40px;
    }
  `;

  div.appendChild(style);

  const playButton = div.querySelector('.play-button');
  if (playButton) {
    playButton.addEventListener('click', () => {
      params.goTo('/play');
    });
  }

  return div;
}
