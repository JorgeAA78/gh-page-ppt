import { state } from '../state/state';
const ganasteImg = require("url:../../soporte/ganaste.png");
const perdisteImg = require("url:../../soporte/perdiste.png");
const empateImg = require("url:../../soporte/empate.png");

export function initResultPage(params: { goTo: (path: string) => void }) {
  const div = document.createElement('div');
  const currentState = state.getState();
  const result = state.whoWins(currentState.currentGame.playerPlay, currentState.currentGame.computerPlay);

  let resultImg = '';
  let resultClass = '';
  if (result === 'win') {
    resultImg = ganasteImg;
    resultClass = 'win';
  }
  if (result === 'loss') {
    resultImg = perdisteImg;
    resultClass = 'loss';
  }
  if (result === 'tie') {
    resultImg = empateImg;
    resultClass = 'tie';
  }

  div.innerHTML = `
    <div class="result-container">
      <img class="result-image" src="${resultImg}" alt="Resultado: ${result}">
      <div class="score-board">
        <h2 class="score-title">Score</h2>
        <p class="score-p">Vos: ${currentState.history.player}</p>
        <p class="score-p">Máquina: ${currentState.history.computer}</p>
      </div>
      <button-el class="play-again-button">Volver a Jugar</button-el>
    </div>
  `;


  const style = document.createElement('style');
  style.innerHTML = `
    .result-container {
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
  `;

  div.appendChild(style);

  const playAgainButton = div.querySelector('.play-again-button');
  if (playAgainButton) {
    playAgainButton.addEventListener('click', () => {
      params.goTo('/instructions');
    });
  }

  return div;
}
