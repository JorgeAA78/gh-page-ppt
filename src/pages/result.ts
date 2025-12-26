import { state } from '../state/state';
const ganasteImg = require("url:../../soporte/ganaste.png");
const perdisteImg = require("url:../../soporte/perdiste.png");
const lluviaGif = require("url:../../soporte/lluvia.gif");
const winSound = require("url:../../soporte/ganaste.mp3"); // Placeholder, please provide the correct filename

export function initResultPage(params: { goTo: (path: string) => void }) {
  const div = document.createElement('div');
  let audio: HTMLAudioElement | null = null;
  const currentState = state.getState();
  const playerWins = currentState.history.player >= 3;
  const computerWins = currentState.history.computer >= 3;

  let resultImg = '';
  let buttonText = 'Siguiente Ronda';
  let finalResult = false;
  let resultText = '';

  if (playerWins) {
    resultImg = ganasteImg;
    buttonText = 'Jugar de Nuevo';
    finalResult = true;
    resultText = '¡Ganaste la partida!';
    audio = new Audio(winSound);
    audio.play();
  } else if (computerWins) {
    resultImg = perdisteImg;
    buttonText = 'Jugar de Nuevo';
    finalResult = true;
    resultText = 'Perdiste la partida';
  } else {
    const roundResult = state.whoWins(currentState.currentGame.playerPlay, currentState.currentGame.computerPlay);
    if (roundResult === 'win') {
      resultImg = ganasteImg;
      resultText = 'Ganaste esta ronda';
    } else {
      resultImg = perdisteImg;
      resultText = 'Perdiste esta ronda';
    }
  }

  div.innerHTML = `
    ${(playerWins && finalResult) ? `<img class="confetti" src="${lluviaGif}" alt="confetti">` : ''}
    <div class="result-container">
      <img class="result-image" src="${resultImg}" alt="${resultText}">
      <div class="score-board">
        <h2 class="score-title">Score</h2>
        <p class="score-p">Vos: ${currentState.history.player}</p>
        <p class="score-p">Máquina: ${currentState.history.computer}</p>
      </div>
      <button-el class="play-again-button">${buttonText}</button-el>
      ${finalResult ? `<button-el class="menu-button">Volver al menú</button-el>` : ''}
    </div>
  `;


  const style = document.createElement('style');
  style.innerHTML = `
    .result-container {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; /* Centra el grupo de elementos verticalmente */
      gap: 20px; /* Añade un espacio de 20px entre cada elemento */
      height: 100%;
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
    }
    .result-image {
      width: 250px;
      height: auto;
    }
    .score-board {
      width: 260px;
      background-color: white;
      border: 10px solid black;
      border-radius: 10px;
      padding: 15px;
      box-sizing: border-box;
      text-align: center;
    }
    .score-title {
      font-size: 55px;
      margin: 0 0 10px 0;
    }
    .score-p {
      font-size: 45px;
      margin: 0;
      text-align: right;
    }
    .play-again-button {
      width: 260px;
    }
    .menu-button {
      width: 260px;
    }
    .confetti {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }
  `;

  div.appendChild(style);

  const playAgainButton = div.querySelector('.play-again-button');
  if (playAgainButton) {
    playAgainButton.addEventListener('click', () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (finalResult) {
        state.resetHistory();
      }
      params.goTo('/play');
    });
  }

  const menuButton = div.querySelector('.menu-button');
  if (menuButton) {
    menuButton.addEventListener('click', () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      state.resetHistory();
      params.goTo('/welcome');
    });
  }

  return div;
}
