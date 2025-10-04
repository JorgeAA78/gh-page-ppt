import { initRouter } from './router/index';
import { state } from './state/state';
import './components/button';
import './components/hand';

(function () {
  const root = document.querySelector('#root');
  if (root) {
    state.init();
    initRouter(root);
  }
})();
