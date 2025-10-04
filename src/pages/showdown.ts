import { state } from '../state/state';

export function initShowdownPage(params: { goTo: (path: string) => void }) {

  const div = document.createElement('div');
  const currentState = state.getState();
  const playerMove = currentState.currentGame.playerPlay;
  const computerMove = currentState.currentGame.computerPlay;

  div.innerHTML = `
    <div class="showdown-container">
      <hand-el type="${computerMove}" class="computer-hand"></hand-el>
      <hand-el type="${playerMove}" class="player-hand"></hand-el>
    </div>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    .showdown-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 20px 0;
      box-sizing: border-box;
    }
    .computer-hand, .player-hand {
      --hand-width: 150px; /* Ancho personalizado */
      --hand-height: 300px; /* Alto personalizado */
    }
    .computer-hand {
      transform: rotate(180deg);
    }
  `;

  div.appendChild(style);

  setTimeout(() => {
    params.goTo('/result');
  }, 3000); 

  return div;
}
