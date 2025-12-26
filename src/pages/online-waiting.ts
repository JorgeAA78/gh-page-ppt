import { state } from "../state/state";

export function initOnlineWaitingPage(params: { goTo: (path: string) => void }) {
  const div = document.createElement("div");

  div.innerHTML = `
    <div class="waiting-container">
      <h1 class="title">Piedra<br>Papel ó<br>Tijera</h1>
      <div class="box">
        <p class="code"></p>
        <p class="hint">Compartí este código con tu contrincante</p>
        <p class="status"></p>
      </div>
      <button-el class="btn start" style="display:none">Empezar</button-el>
      <button-el class="btn back">Volver</button-el>
      <div class="hands-container">
        <hand-el type="tijera"></hand-el>
        <hand-el type="piedra"></hand-el>
        <hand-el type="papel"></hand-el>
      </div>
    </div>
  `;

  const style = document.createElement("style");
  style.innerHTML = `
    .waiting-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 20px 0;
      box-sizing: border-box;
      text-align: center;
    }
    .title {
      font-size: 80px;
      color: #009048;
      margin: 0;
      text-align: center;
      line-height: 1.2;
    }
    .box {
      width: 100%;
      max-width: 520px;
      padding: 20px;
      box-sizing: border-box;
      border: 4px solid #000;
      border-radius: 10px;
      background: #fff;
    }
    .code {
      font-size: 36px;
      margin: 0 0 10px 0;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .hint {
      margin: 0;
      font-size: 18px;
    }
    .status {
      margin: 16px 0 0 0;
      font-size: 20px;
    }
    .btn {
      width: 100%;
      max-width: 322px;
    }
    .hands-container {
      display: flex;
      gap: 40px;
    }
  `;
  div.appendChild(style);

  const codeEl = div.querySelector(".code") as HTMLParagraphElement | null;
  const statusEl = div.querySelector(".status") as HTMLParagraphElement | null;
  const startBtn = div.querySelector(".start") as HTMLElement | null;

  function render() {
    const s = state.getState();
    const shortCode = s.online.shortCode;
    const room = s.online.room;

    if (codeEl) codeEl.textContent = shortCode ? `Código: ${shortCode}` : "";

    const playersCount = room?.players ? Object.keys(room.players).length : 0;
    if (statusEl) {
      statusEl.textContent = playersCount < 2 ? "Esperando a tu contrincante..." : "¡Listos para jugar!";
    }

    const isOwner = Boolean(room && s.online.userId && room.ownerId === s.online.userId);
    if (startBtn) {
      startBtn.style.display = playersCount >= 2 && isOwner ? "block" : "none";
    }

    // Si el host ya inició la partida, ambos jugadores pasan a /online/play
    if (room?.currentGame?.roundId) {
      clearInterval(intervalId);
      params.goTo("/online/play");
    }
  }

  async function pollRoom() {
    try {
      await state.fetchRoom();
      render();
    } catch {
      render();
    }
  }

  const intervalId = setInterval(pollRoom, 1500);
  pollRoom();

  startBtn?.addEventListener("click", async () => {
    await state.startGame();
    clearInterval(intervalId);
    params.goTo("/online/play");
  });

  div.querySelector(".back")?.addEventListener("click", () => {
    clearInterval(intervalId);
    params.goTo("/online");
  });

  return div;
}
