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
  function goTo(path: string) {
    history.pushState({}, '', path);
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
      }
    }
  }

  if (location.pathname === '/') {
    history.replaceState({}, '', '/welcome');
    handleRoute('/welcome');
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = () => {
    handleRoute(location.pathname);
  };
}
