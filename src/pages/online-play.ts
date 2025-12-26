import { state } from "../state/state";

export function initOnlinePlayPage(params: { goTo: (path: string) => void }) {
  const div = document.createElement("div");

  div.innerHTML = `
    <div class="online-play-container">
      <h1 class="title">Piedra<br>Papel ó<br>Tijera</h1>
      <p class="text">Sala: ${state.getState().online.shortCode || ""}</p>
      <p class="status"></p>
      <div class="hands">
        <hand-el class="hand" type="tijera"></hand-el>
        <hand-el class="hand" type="piedra"></hand-el>
        <hand-el class="hand" type="papel"></hand-el>
      </div>
      <button-el class="btn back">Volver</button-el>
    </div>
  `;

  const style = document.createElement("style");
  style.innerHTML = `
    .online-play-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      gap: 16px;
      text-align: center;
      padding: 20px;
      box-sizing: border-box;
    }
    .title {
      font-size: 80px;
      color: #009048;
      margin: 0;
      text-align: center;
      line-height: 1.2;
    }
    .text {
      font-size: 18px;
      margin: 0;
      max-width: 520px;
    }
    .status {
      font-size: 18px;
      margin: 0;
      min-height: 24px;
    }
    .hands {
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
    .btn {
      width: 100%;
      max-width: 322px;
    }
  `;
  div.appendChild(style);

  const statusEl = div.querySelector(".status") as HTMLParagraphElement | null;
  const hands = div.querySelectorAll(".hand");

  async function ensureGameStarted() {
    await state.fetchRoom();
    const room = state.getState().online.room;
    if (!room?.currentGame?.roundId) {
      if (statusEl) statusEl.textContent = "Esperando a que el host inicie la partida...";
      return null;
    }
    if (statusEl) statusEl.textContent = "Elegí tu jugada";
    return String(room.currentGame.roundId);
  }

  let roundId: string | null = null;
  ensureGameStarted().then((rid) => (roundId = rid));

  hands.forEach((hand) => {
    hand.addEventListener("click", async () => {
      if (statusEl) statusEl.textContent = "";
      if (!roundId) {
        roundId = await ensureGameStarted();
      }
      if (!roundId) return;

      const type = hand.getAttribute("type") as any;
      if (!type) return;

      hands.forEach((h) => h.classList.remove("selected"));
      hand.classList.add("selected");

      if (statusEl) statusEl.textContent = "Enviando jugada...";
      try {
        await state.playOnline(type);
        if (statusEl) statusEl.textContent = "Esperando al contrincante...";
        await state.waitForRoundResult(roundId);
        params.goTo("/online/result");
      } catch (e: any) {
        if (statusEl) statusEl.textContent = e?.message || "Error";
      }
    });
  });

  div.querySelector(".back")?.addEventListener("click", () => params.goTo("/online"));

  return div;
}
