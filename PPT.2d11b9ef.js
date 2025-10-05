const e={data:{currentGame:{playerPlay:"",computerPlay:""},history:{player:0,computer:0}},listeners:[],init(){},getState(){return this.data},setState(e){for(let t of(this.data=e,this.listeners))t();console.log("State updated:",this.data)},subscribe(e){this.listeners.push(e)},setPlayerMove(e){this.getState().currentGame.playerPlay=e,this.setComputerMove()},setComputerMove(){let e=["piedra","papel","tijera"][Math.floor(3*Math.random())],t=this.getState();t.currentGame.computerPlay=e,this.pushToHistory(t.currentGame.playerPlay,e)},whoWins:(e,t)=>e===t?"tie":"piedra"===e&&"tijera"===t||"papel"===e&&"piedra"===t||"tijera"===e&&"papel"===t?"win":"loss",pushToHistory(e,t){let n=this.getState(),a=this.whoWins(e,t);"win"===a&&n.history.player++,"loss"===a&&n.history.computer++,this.setState(n)},resetHistory(){let e=this.getState();e.history.player=0,e.history.computer=0,this.setState(e)}};var t={};t=import.meta.resolve("gyiAf");var n={};n=import.meta.resolve("bvizz");var a={};a=import.meta.resolve("ejkHH");var o={};o=import.meta.resolve("LzNg8");const r=[{path:/^\/welcome$/,component:function(e){let t=document.createElement("div");t.innerHTML=`
    <h1 class="title">Piedra<br>Papel \xf3<br>Tijera</h1>
    <button-el class="start-button">Empezar</button-el>
    <div class="hands-container">
      <hand-el type="tijera"></hand-el>
      <hand-el type="piedra"></hand-el>
      <hand-el type="papel"></hand-el>
    </div>
  `,t.classList.add("welcome-container");let n=document.createElement("style");n.innerHTML=`
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
  `,t.appendChild(n);let a=t.querySelector(".start-button");return a&&a.addEventListener("click",()=>{e.goTo("/instructions")}),t}},{path:/^\/instructions$/,component:function(e){let t=document.createElement("div");t.innerHTML=`
    <p class="instructions-text">Presion\xe1 jugar y eleg\xed: piedra, papel o tijera antes de que pasen los 3 segundos.<br><br>El primero en llegar a 3 puntos gana el juego</p>
    <button-el class="play-button">\xa1Jugar!</button-el>
    <div class="hands-container">
      <hand-el type="tijera"></hand-el>
      <hand-el type="piedra"></hand-el>
      <hand-el type="papel"></hand-el>
    </div>
  `,t.classList.add("instructions-container");let n=document.createElement("style");n.innerHTML=`
    .instructions-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      text-align: center;
    }
    .instructions-text {
      font-size: 40px;
      text-align: center;
      color: #000000;
      line-height: 1.2;
      max-width: 320px;
    }
    .play-button {
      width: 100%;
      max-width: 322px;
    }
    .hands-container {
      display: flex;
      gap: 40px;
    }
  `,t.appendChild(n);let a=t.querySelector(".play-button");return a&&a.addEventListener("click",()=>{e.goTo("/play")}),t}},{path:/^\/play$/,component:function(t){let n=document.createElement("div"),a=3,o=()=>{let o=n.querySelector(".countdown-number");o&&(o.textContent=String(a)),--a<0&&(clearInterval(r),""===e.getState().currentGame.playerPlay&&e.setPlayerMove(""),t.goTo("/showdown"))},r=setInterval(o,1e3);n.innerHTML=`
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
  `;let i=document.createElement("style");i.innerHTML=`
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
      stroke-dasharray: 283; /* Circunferencia de un c\xedrculo con r=45 (2*PI*45) */
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
  `,n.appendChild(i);let s=n.querySelectorAll(".hand");return s.forEach(n=>{n.addEventListener("click",()=>{let a=n.getAttribute("type");a&&(e.setPlayerMove(a),s.forEach(e=>e.classList.remove("selected")),n.classList.add("selected"),clearInterval(r),setTimeout(()=>{t.goTo("/showdown")},500))})}),o(),n}},{path:/^\/showdown$/,component:function(t){let n=document.createElement("div"),a=e.getState(),o=a.currentGame.playerPlay,r=a.currentGame.computerPlay;n.innerHTML=`
    <div class="showdown-container">
      <hand-el type="${r}" class="computer-hand"></hand-el>
      <hand-el type="${o}" class="player-hand"></hand-el>
    </div>
  `;let i=document.createElement("style");return i.innerHTML=`
    .showdown-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 20px 0;
      box-sizing: border-box;
    }
    .computer-hand, .player-hand {
      --hand-width: 150px; /* Ancho personalizado */
      --hand-height: 300px; /* Alto personalizado */
    }
    .computer-hand {
      transform: rotate(180deg);
    }
  `,n.appendChild(i),setTimeout(()=>{"tie"===e.whoWins(o,r)?t.goTo("/play"):t.goTo("/result")},2e3),n}},{path:/^\/result$/,component:function(r){let i=document.createElement("div"),s=e.getState(),l=s.history.player>=3,c=s.history.computer>=3,d="",p="Siguiente Ronda",h=!1,u="";l?(d=t,p="Jugar de Nuevo",h=!0,u="¡Ganaste la partida!",new Audio(o).play()):c?(d=n,p="Jugar de Nuevo",h=!0,u="Perdiste la partida"):"win"===e.whoWins(s.currentGame.playerPlay,s.currentGame.computerPlay)?(d=t,u="Ganaste esta ronda"):(d=n,u="Perdiste esta ronda"),i.innerHTML=`
    ${l&&h?`<img class="confetti" src="${a}" alt="confetti">`:""}
    <div class="result-container">
      <img class="result-image" src="${d}" alt="${u}">
      <div class="score-board">
        <h2 class="score-title">Score</h2>
        <p class="score-p">Vos: ${s.history.player}</p>
        <p class="score-p">M\xe1quina: ${s.history.computer}</p>
      </div>
      <button-el class="play-again-button">${p}</button-el>
    </div>
  `;let m=document.createElement("style");m.innerHTML=`
    .result-container {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; /* Centra el grupo de elementos verticalmente */
      gap: 20px; /* A\xf1ade un espacio de 20px entre cada elemento */
      height: 100%;
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
    }
    .result-image {
      width: 250px;
      height: auto;
    }
    .score-board {
      width: 260px;
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
      font-size: 45px;
      margin: 0;
      text-align: right;
    }
    .play-again-button {
      width: 260px;
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
  `,i.appendChild(m);let g=i.querySelector(".play-again-button");return g&&g.addEventListener("click",()=>{h&&e.resetHistory(),r.goTo("/play")}),i},background:"solid"}];class i extends HTMLElement{constructor(){super(),this.render()}render(){let e=this.attachShadow({mode:"open"}),t=document.createElement("button"),n=document.createElement("style");t.textContent=this.textContent,n.innerHTML=`
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
    `,t.classList.add("button"),e.appendChild(n),e.appendChild(t)}}customElements.define("button-el",i);var s={};s=import.meta.resolve("9dVwf");var l={};l=import.meta.resolve("6kYrV");var c={};c=import.meta.resolve("6FgcY");class d extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.type=this.getAttribute("type")||"piedra",this.render()}render(){let e,t=document.createElement("style");"piedra"===this.type&&(e=s),"papel"===this.type&&(e=l),"tijera"===this.type&&(e=c),t.innerHTML=`
      .hand {
        width: var(--hand-width, 70px);
        height: var(--hand-height, 130px);
        background-image: url(${e});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    `,this.shadow.innerHTML='<div class="hand"></div>',this.shadow.appendChild(t)}}customElements.define("hand-el",d);const p=document.querySelector("#root");p&&(e.init(),function(t){let n="/gh-page-ppt";function a(){return location.host.includes("github.io")}function o(e){let t=a()?`${n}${e}`:e;history.pushState({},"",t),i(e)}function i(n){for(let a of(console.log(`Navigating to: ${n}`),r))if(a.path.test(n)){let n=a.component({goTo:o});if(t.style.backgroundImage="",t.style.backgroundColor="transparent","solid"===a.background){let n=e.whoWins(e.getState().currentGame.playerPlay,e.getState().currentGame.computerPlay);"win"===n&&(t.style.backgroundColor="#888949"),"loss"===n&&(t.style.backgroundColor="#894949")}t.firstChild&&t.firstChild.remove(),t.appendChild(n);return}console.error("404 - Route not found:",n),o("/welcome")}function s(e){return a()&&e.startsWith(n)?e.substring(n.length)||"/":e}"/"===location.pathname||location.pathname.endsWith("/gh-page-ppt/")?o("/welcome"):i(s(location.pathname)),window.onpopstate=()=>{i(s(location.pathname))}}(p));
//# sourceMappingURL=PPT.2d11b9ef.js.map
