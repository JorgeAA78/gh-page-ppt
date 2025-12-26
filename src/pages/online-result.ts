import { state } from "../state/state";

const ganasteImg = require("url:../../soporte/ganaste.png");
const perdisteImg = require("url:../../soporte/perdiste.png");
 const lluviaGif = require("url:../../soporte/lluvia.gif");
const winSound = require("url:../../soporte/ganaste.mp3");

export function initOnlineResultPage(params: { goTo: (path: string) => void }) {
  const div = document.createElement("div");

  let audio: HTMLAudioElement | null = null;

  const s = state.getState();
  const room = s.online.room;
  const last = room?.lastResult;

  const matchFinished = Boolean(room?.matchFinished || last?.matchFinished);
  const matchWinnerId: string | null = room?.matchWinnerId ?? last?.matchWinnerId ?? null;

  const winnerId: string | null = last?.winnerId ?? null;
  const isTie = !winnerId;
  const didWinRound = winnerId === s.online.userId;

  const didWinMatch = Boolean(matchFinished && matchWinnerId && matchWinnerId === s.online.userId);

  let resultImg = isTie ? "" : didWinRound ? ganasteImg : perdisteImg;
  let title = isTie ? "Empate" : didWinRound ? "Ganaste" : "Perdiste";

  if (matchFinished) {
    if (didWinMatch) {
      resultImg = ganasteImg;
      title = "¡Ganaste la partida!";
      audio = new Audio(winSound);
      audio.play();
    } else {
      resultImg = perdisteImg;
      title = "Perdiste la partida";
    }
  }

  const matchScore = room?.matchScore || {};
  const players = room?.players || {};
  const playerIds = Object.keys(players);

  const lines = playerIds
    .map((id) => {
      const name = players[id]?.name || id;
      const points = typeof matchScore[id] === "number" ? matchScore[id] : 0;
      return `<p class="score-p">${name}: ${points}</p>`;
    })
    .join("");

  let matchText = "";
  if (matchFinished && matchWinnerId) {
    matchText = `Ganó el match: ${players[matchWinnerId]?.name || matchWinnerId}`;
  }

  div.innerHTML = `
    ${(didWinMatch) ? `<img class="confetti" src="${lluviaGif}" alt="confetti">` : ""}
    <div class="result-container">
      <h2 class="result-title">${title}</h2>
      ${resultImg ? `<img class="result-image" src="${resultImg}" alt="${title}">` : ""}
      <div class="score-board">
        <h2 class="score-title">Primero a 3</h2>
        ${lines}
      </div>
      <p class="match-text">${matchText}</p>
      <button-el class="play-again-button">${matchFinished ? "Volver a jugar" : "Siguiente ronda"}</button-el>
      <button-el class="back-button">Volver</button-el>
    </div>
  `;

  const style = document.createElement("style");
  style.innerHTML = `
    .result-container {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      height: 100%;
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
      text-align: center;
    }
    .result-title {
      font-size: 60px;
      margin: 0;
    }
    .result-image {
      width: 250px;
      height: auto;
    }
    .score-board {
      width: 360px;
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
      font-size: 32px;
      margin: 0;
      text-align: right;
    }
    .play-again-button, .back-button {
      width: 360px;
    }
    .match-text {
      font-size: 18px;
      margin: 0;
      min-height: 22px;
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

  div.querySelector(".play-again-button")?.addEventListener("click", async () => {
    await state.fetchRoom();

    const isOwner = state.isRoomOwner();
    if (isOwner) {
      // El host es quien inicia cada ronda. Si el match terminó, startGame resetea el matchScore.
      await state.startGame();
      params.goTo("/online/play");
    } else {
      // El invitado espera en waiting y será redirigido cuando aparezca el nuevo currentGame.
      params.goTo("/online/waiting");
    }
  });

  div.querySelector(".back-button")?.addEventListener("click", () => {
    params.goTo("/online");
  });

  return div;
}
