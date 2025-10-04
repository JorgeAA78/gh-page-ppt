import { initWelcomePage } from '../pages/welcome';
import { initInstructionsPage } from '../pages/instructions';
import { initPlayPage } from '../pages/play';
import { initResultPage } from '../pages/result';
import { initShowdownPage } from '../pages/showdown';
import { state } from '../state/state';

const fondo = require("url:../../soporte/fondo.png");

const routes = [
  { path: /\/welcome/, component: initWelcomePage, background: `url(${fondo})` },
  { path: /\/instructions/, component: initInstructionsPage, background: `url(${fondo})` },
  { path: /\/play/, component: initPlayPage, background: `url(${fondo})` },
  { path: /\/showdown/, component: initShowdownPage, background: `url(${fondo})` },
  { path: /\/result/, component: initResultPage, background: 'solid' }, // 'solid' indica que el color depende del resultado
];

export function initRouter(container: Element) {
  const basePath = "/gh-page-ppt";

  function isGithubPages() {
    return location.host.includes("github.io");
  }

  function goTo(path: string) {
    const completePath = isGithubPages() ? `${basePath}${path}` : path;
    history.pushState({}, "", completePath);
    handleRoute(path);
  }

  function handleRoute(path: string) {
    console.log(`Navigating to: ${path}`);
    for (const r of routes) {
      if (r.path.test(path)) {
        const el = r.component({ goTo });
        const root = container as HTMLElement;
        if (r.background === 'solid') {
          const result = state.whoWins(state.getState().currentGame.playerPlay, state.getState().currentGame.computerPlay);
          if (result === 'win') root.style.backgroundColor = '#888949';
          if (result === 'loss') root.style.backgroundColor = '#894949';
          if (result === 'tie') root.style.backgroundColor = '#D5D588';
          root.style.backgroundImage = 'none';
        } else {
          root.style.backgroundImage = r.background;
          root.style.backgroundColor = 'transparent';
        }

        if (root.firstChild) {
          root.firstChild.remove();
        }
        root.appendChild(el);
        return; // Termina la función una vez que se encuentra la ruta
      }
    }
    // Si ninguna ruta coincide, redirige a welcome
    goTo("/welcome");
  }

  function processPath(path: string) {
    if (isGithubPages() && path.startsWith(basePath)) {
      return path.substring(basePath.length) || "/";
    }
    return path;
  }

  // Manejo de la ruta inicial
  handleRoute(processPath(location.pathname));

  // Manejo de la navegación hacia atrás/adelante
  window.onpopstate = () => {
    handleRoute(processPath(location.pathname));
  };
}
