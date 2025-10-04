const piedra = require("url:../../soporte/piedra.png");
const papel = require("url:../../soporte/papel.png");
const tijera = require("url:../../soporte/tijera.png");

class Hand extends HTMLElement {
  shadow: ShadowRoot;
  type: string;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.type = this.getAttribute('type') || 'piedra';
    this.render();
  }

  render() {
    const style = document.createElement('style');
    let handImg;

    if (this.type === 'piedra') handImg = piedra;
    if (this.type === 'papel') handImg = papel;
    if (this.type === 'tijera') handImg = tijera;

    style.innerHTML = `
      .hand {
        width: var(--hand-width, 70px);
        height: var(--hand-height, 130px);
        background-image: url(${handImg});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    `;

    this.shadow.innerHTML = `<div class="hand"></div>`;
    this.shadow.appendChild(style);
  }
}

customElements.define('hand-el', Hand);
