import { initWelcomePage } from '../pages/welcome';
import { initInstructionsPage } from '../pages/instructions';
import { initPlayPage } from '../pages/play';
import { initResultPage } from '../pages/result';
import { initShowdownPage } from '../pages/showdown';
import { state } from '../state/state';

const routes = [
  { path: /\/welcome/, component: initWelcomePage },
  { path: /\/instructions/, component: initInstructionsPage },
  { path: /\/play/, component: initPlayPage },
  { path: /\/showdown/, component: initShowdownPage },
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

        // Reset background styles before rendering the new page
        root.style.backgroundImage = '';
        root.style.backgroundColor = 'transparent';

        if (r.background === 'solid') {
          const result = state.whoWins(state.getState().currentGame.playerPlay, state.getState().currentGame.computerPlay);
          if (result === 'win') root.style.backgroundColor = '#888949';
          if (result === 'loss') root.style.backgroundColor = '#894949';
        }

        if (root.firstChild) {
          root.firstChild.remove();
        }
        root.appendChild(el);
        return;
      }
    }
    // If no route is matched, go to /welcome. This is especially important for the initial load on GitHub Pages.
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
