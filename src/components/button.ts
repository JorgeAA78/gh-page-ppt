class Button extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const shadow = this.attachShadow({ mode: 'open' });
    const button = document.createElement('button');
    const style = document.createElement('style');

    button.textContent = this.textContent;

    style.innerHTML = `
      .button {
        width: 100%;
        min-height: 87px;
        background-color: #006CFC;
        border: 10px solid #001997;
        border-radius: 10px;
        font-family: 'Odibee Sans', cursive;
        font-size: clamp(28px, 7vw, 45px);
        line-height: 1.05;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 14px;
        text-align: center;
        white-space: normal;
        word-break: break-word;
      }
    `;

    button.classList.add('button');
    shadow.appendChild(style);
    shadow.appendChild(button);
  }
}

customElements.define('button-el', Button);
