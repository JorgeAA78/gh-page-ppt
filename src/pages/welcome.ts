export function initWelcomePage(params: { goTo: (path: string) => void }) {
  const div = document.createElement('div');
  div.innerHTML = `
    <h1 class="title">Piedra<br>Papel ó<br>Tijera</h1>
    <button-el class="start-button">Empezar</button-el>
    <div class="hands-container">
      <hand-el type="tijera"></hand-el>
      <hand-el type="piedra"></hand-el>
      <hand-el type="papel"></hand-el>
    </div>
  `;

  div.classList.add('welcome-container');
  const style = document.createElement('style');
  style.innerHTML = `
    .welcome-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
    .title {
      font-size: 80px;
      color: #009048;
      margin: 0;
      text-align: center;
      line-height: 1.2;
      
    }
    .start-button {
      width: 100%;
      max-width: 322px;
    }
    .hands-container {
      display: flex;
      gap: 40px;
    }
  `;

  div.appendChild(style);

  const startButton = div.querySelector('.start-button');
  if (startButton) {
    startButton.addEventListener('click', () => {
      params.goTo('/instructions');
    });
  }

  return div;
}
