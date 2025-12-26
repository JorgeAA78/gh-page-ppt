import { state } from "../state/state";

export function initOnlineJoinRoomPage(params: { goTo: (path: string) => void }) {
  const div = document.createElement("div");

  div.innerHTML = `
    <div class="online-form-container">
      <h1 class="title">Piedra<br>Papel ó<br>Tijera</h1>

      <label class="label">
        Tu nombre
        <input class="input name" type="text" placeholder="Facu" />
      </label>

      <label class="label">
        Código
        <input class="input code" type="text" inputmode="numeric" placeholder="1234" />
      </label>

      <button-el class="btn join">Ingresar</button-el>
      <button-el class="btn back">Volver</button-el>
      <p class="error"></p>

      <div class="hands-container">
        <hand-el type="tijera"></hand-el>
        <hand-el type="piedra"></hand-el>
        <hand-el type="papel"></hand-el>
      </div>
    </div>
  `;

  const style = document.createElement("style");
  style.innerHTML = `
    .online-form-container {
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
    .label {
      width: 100%;
      max-width: 322px;
      font-size: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: stretch;
    }
    .input {
      height: 55px;
      font-size: 24px;
      padding: 0 12px;
      border: 4px solid #000;
      border-radius: 6px;
      box-sizing: border-box;
      outline: none;
    }
    .btn {
      width: 100%;
      max-width: 322px;
    }
    .error {
      min-height: 24px;
      color: #8b0000;
      font-size: 16px;
      margin: 0;
    }
    .hands-container {
      display: flex;
      gap: 40px;
    }
  `;
  div.appendChild(style);

  const errorEl = div.querySelector(".error") as HTMLParagraphElement | null;
  const nameInput = div.querySelector(".name") as HTMLInputElement | null;
  const codeInput = div.querySelector(".code") as HTMLInputElement | null;

  div.querySelector(".join")?.addEventListener("click", async () => {
    if (errorEl) errorEl.textContent = "";
    const name = nameInput?.value?.trim();
    const shortCode = codeInput?.value?.trim();
    if (!name) {
      if (errorEl) errorEl.textContent = "Ingresá tu nombre";
      return;
    }
    if (!shortCode) {
      if (errorEl) errorEl.textContent = "Ingresá el código";
      return;
    }

    try {
      await state.createOnlineUser(name);
      await state.joinRoom(shortCode);
      params.goTo("/online/waiting");
    } catch (e: any) {
      if (errorEl) errorEl.textContent = e?.message || "Error";
    }
  });

  div.querySelector(".back")?.addEventListener("click", () => params.goTo("/online"));

  return div;
}
