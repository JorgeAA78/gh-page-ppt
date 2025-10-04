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
        height: 87px;
        background-color: #006CFC;
        border: 10px solid #001997;
        border-radius: 10px;
        font-family: 'Odibee Sans', cursive;
        font-size: 45px;
        color: white;
        cursor: pointer;
      }
    `;

    button.classList.add('button');
    shadow.appendChild(style);
    shadow.appendChild(button);
  }
}

customElements.define('button-el', Button);
