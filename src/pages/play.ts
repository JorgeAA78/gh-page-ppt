import { state } from '../state/state';

export function initPlayPage(params: { goTo: (path: string) => void }) {
  const div = document.createElement('div');
  let countdown = 3;

  const updateCountdown = () => {
    const countdownEl = div.querySelector('.countdown-number');
    if (countdownEl) {
      countdownEl.textContent = String(countdown);
    }
    countdown--;
    if (countdown < 0) {
      clearInterval(intervalId);
      // Si el jugador no eligió, vuelve a las instrucciones
      // Si el jugador no eligió, la computadora elige por él y continúa
      if (state.getState().currentGame.playerPlay === "") {
        state.setPlayerMove(""); // Esto hará que la computadora elija una jugada
      }
      params.goTo('/showdown');
    }
  };

  const intervalId = setInterval(updateCountdown, 1000);

  div.innerHTML = `
    <div class="play-container">
      <div class="countdown-container">
        <div class="countdown-number">3</div>
        <svg class="countdown-svg" width="243" height="243" viewBox="0 0 100 100">
          <circle class="countdown-bg" cx="50" cy="50" r="45"></circle>
          <circle class="countdown-fg" cx="50" cy="50" r="45"></circle>
        </svg>
      </div>
      <div class="hands-container">
        <hand-el class="hand" type="tijera"></hand-el>
        <hand-el class="hand" type="piedra"></hand-el>
        <hand-el class="hand" type="papel"></hand-el>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    .play-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
    .countdown-container {
      position: relative;
      width: 243px;
      height: 243px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px; /* Add some space from the top */
    }
    .countdown-number {
      font-size: 100px;
      font-weight: bold;
      position: absolute;
    }
    .countdown-svg {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .countdown-bg {
      fill: none;
      stroke: #f0f0f0;
      stroke-width: 10;
    }
    .countdown-fg {
      fill: none;
      stroke: black;
      stroke-width: 10;
      stroke-linecap: round;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      stroke-dasharray: 283; /* Circunferencia de un círculo con r=45 (2*PI*45) */
      stroke-dashoffset: 283;
      animation: countdown-anim 3s linear forwards;
    }
    @keyframes countdown-anim {
      from {
        stroke-dashoffset: 283;
      }
      to {
        stroke-dashoffset: 0;
      }
    }
    .hands-container {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 40px;
    }
    .hand {
      cursor: pointer;
      transition: all 0.3s;
    }
    .hand:hover {
      transform: translateY(-10px);
    }
    .hand.selected {
      transform: translateY(-20px) scale(1.2);
      opacity: 1;
    }
    .hand:not(.selected) {
      opacity: 0.5;
    }
  `;

  div.appendChild(style);

  const hands = div.querySelectorAll('.hand');
  hands.forEach(hand => {
    hand.addEventListener('click', () => {
      const type = hand.getAttribute('type');
      if (type) {
        state.setPlayerMove(type as any);
        hands.forEach(h => h.classList.remove('selected'));
        hand.classList.add('selected');
        // Detener el temporizador y navegar
        clearInterval(intervalId);
        setTimeout(() => {
          params.goTo('/showdown');
        }, 500); // Pequeña demora para que el jugador vea la selección
      }
      
    });
  });

  updateCountdown();
  return div;
}
