export function initOnlineMenuPage(params: { goTo: (path: string) => void }) {
  const div = document.createElement("div");

  div.innerHTML = `
    <div class="online-menu-container">
      <h1 class="title">Piedra<br>Papel ó<br>Tijera</h1>
      <div class="buttons">
        <button-el class="btn new-room">Nueva sala</button-el>
        <button-el class="btn join-room">Ingresar a sala</button-el>
        <button-el class="btn back">Volver</button-el>
      </div>
      <div class="hands-container">
        <hand-el type="tijera"></hand-el>
        <hand-el type="piedra"></hand-el>
        <hand-el type="papel"></hand-el>
      </div>
    </div>
  `;

  const style = document.createElement("style");
  style.innerHTML = `
    .online-menu-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 20px 0;
      box-sizing: border-box;
    }
    .title {
      font-size: 80px;
      color: #009048;
      margin: 0;
      text-align: center;
      line-height: 1.2;
    }
    .buttons {
      width: 100%;
      max-width: 322px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .btn {
      width: 100%;
    }
    .hands-container {
      display: flex;
      gap: 40px;
    }
  `;
  div.appendChild(style);

  div.querySelector(".new-room")?.addEventListener("click", () => params.goTo("/online/new"));
  div.querySelector(".join-room")?.addEventListener("click", () => params.goTo("/online/join"));
  div.querySelector(".back")?.addEventListener("click", () => params.goTo("/welcome"));

  return div;
}
