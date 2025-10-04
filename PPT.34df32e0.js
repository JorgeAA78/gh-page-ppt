// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  function $parcel$resolve(url) {  url = importMap[url] || url;  return import.meta.resolve(distDir + url);}newRequire.resolve = $parcel$resolve;

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"3dtlh":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "4b8ea06834df32e0";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"gH3Lb":[function(require,module,exports,__globalThis) {
var _index = require("./router/index");
var _state = require("./state/state");
var _button = require("./components/button");
var _hand = require("./components/hand");
(function() {
    const root = document.querySelector('#root');
    if (root) {
        (0, _state.state).init();
        (0, _index.initRouter)(root);
    }
})();

},{"./router/index":"7IYtx","./state/state":"gsPiT","./components/button":"fByw0","./components/hand":"fQX5N"}],"7IYtx":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initRouter", ()=>initRouter);
var _welcome = require("../pages/welcome");
var _instructions = require("../pages/instructions");
var _play = require("../pages/play");
var _result = require("../pages/result");
var _showdown = require("../pages/showdown");
var _state = require("../state/state");
const fondo = require("6d276cd03227963a");
const routes = [
    {
        path: /\/welcome/,
        component: (0, _welcome.initWelcomePage),
        background: `url(${fondo})`
    },
    {
        path: /\/instructions/,
        component: (0, _instructions.initInstructionsPage),
        background: `url(${fondo})`
    },
    {
        path: /\/play/,
        component: (0, _play.initPlayPage),
        background: `url(${fondo})`
    },
    {
        path: /\/showdown/,
        component: (0, _showdown.initShowdownPage),
        background: `url(${fondo})`
    },
    {
        path: /\/result/,
        component: (0, _result.initResultPage),
        background: 'solid'
    }
];
function initRouter(container) {
    function goTo(path) {
        history.pushState({}, '', path);
        handleRoute(path);
    }
    function handleRoute(path) {
        console.log(`Navigating to: ${path}`);
        for (const r of routes)if (r.path.test(path)) {
            const el = r.component({
                goTo
            });
            const root = container;
            if (r.background === 'solid') {
                const result = (0, _state.state).whoWins((0, _state.state).getState().currentGame.playerPlay, (0, _state.state).getState().currentGame.computerPlay);
                if (result === 'win') root.style.backgroundColor = '#888949';
                if (result === 'loss') root.style.backgroundColor = '#894949';
                if (result === 'tie') root.style.backgroundColor = '#D5D588';
                root.style.backgroundImage = 'none';
            } else {
                root.style.backgroundImage = r.background;
                root.style.backgroundColor = 'transparent';
            }
            if (root.firstChild) root.firstChild.remove();
            root.appendChild(el);
        }
    }
    if (location.pathname === '/') {
        history.replaceState({}, '', '/welcome');
        handleRoute('/welcome');
    } else handleRoute(location.pathname);
    window.onpopstate = ()=>{
        handleRoute(location.pathname);
    };
}

},{"../pages/welcome":"5MH9k","../pages/instructions":"cwpNh","../pages/play":"HxBRi","../pages/result":"drinv","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","../pages/showdown":"96tSt","../state/state":"gsPiT","6d276cd03227963a":"1FmtC"}],"5MH9k":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initWelcomePage", ()=>initWelcomePage);
function initWelcomePage(params) {
    const div = document.createElement('div');
    div.innerHTML = `
    <h1 class="title">Piedra<br>Papel \xf3<br>Tijera</h1>
    <button-el class="start-button">Empezar</button-el>
    <div class="hands-container">
      <hand-el type="tijera"></hand-el>
      <hand-el type="piedra"></hand-el>
      <hand-el type="papel"></hand-el>
    </div>
  `;
    div.classList.add('welcome-container');
    const style = document.createElement('style');
    style.innerHTML = `
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
  `;
    div.appendChild(style);
    const startButton = div.querySelector('.start-button');
    if (startButton) startButton.addEventListener('click', ()=>{
        params.goTo('/instructions');
    });
    return div;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"cwpNh":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initInstructionsPage", ()=>initInstructionsPage);
function initInstructionsPage(params) {
    const div = document.createElement('div');
    div.innerHTML = `
    <p class="instructions-text">Presion\xe1 jugar y eleg\xed: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
    <button-el class="play-button">\xa1Jugar!</button-el>
    <div class="hands-container">
      <hand-el type="tijera"></hand-el>
      <hand-el type="piedra"></hand-el>
      <hand-el type="papel"></hand-el>
    </div>
  `;
    div.classList.add('instructions-container');
    const style = document.createElement('style');
    style.innerHTML = `
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
  `;
    div.appendChild(style);
    const playButton = div.querySelector('.play-button');
    if (playButton) playButton.addEventListener('click', ()=>{
        params.goTo('/play');
    });
    return div;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"HxBRi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initPlayPage", ()=>initPlayPage);
var _state = require("../state/state");
function initPlayPage(params) {
    const div = document.createElement('div');
    let countdown = 3;
    const updateCountdown = ()=>{
        const countdownEl = div.querySelector('.countdown-number');
        if (countdownEl) countdownEl.textContent = String(countdown);
        countdown--;
        if (countdown < 0) {
            clearInterval(intervalId);
            // Si el jugador no eligió, vuelve a las instrucciones
            if ((0, _state.state).getState().currentGame.playerPlay === "") params.goTo('/instructions');
            else params.goTo('/showdown');
        }
    };
    const intervalId = setInterval(updateCountdown, 1000);
    div.innerHTML = `
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
  `;
    const style = document.createElement('style');
    style.innerHTML = `
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
  `;
    div.appendChild(style);
    const hands = div.querySelectorAll('.hand');
    hands.forEach((hand)=>{
        hand.addEventListener('click', ()=>{
            const type = hand.getAttribute('type');
            (0, _state.state).setPlayerMove(type);
            hands.forEach((h)=>h.classList.remove('selected'));
            hand.classList.add('selected');
        });
    });
    updateCountdown();
    return div;
}

},{"../state/state":"gsPiT","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"gsPiT":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state);
const state = {
    data: {
        currentGame: {
            playerPlay: "",
            computerPlay: ""
        },
        history: {
            player: 0,
            computer: 0
        }
    },
    listeners: [],
    init () {
        const localData = localStorage.getItem("saved-state");
        if (localData) this.data.history = JSON.parse(localData);
    },
    getState () {
        return this.data;
    },
    setState (newState) {
        this.data = newState;
        for (const cb of this.listeners)cb();
        localStorage.setItem("saved-state", JSON.stringify(this.data.history));
        console.log("State updated:", this.data);
    },
    subscribe (callback) {
        this.listeners.push(callback);
    },
    setPlayerMove (move) {
        const currentState = this.getState();
        currentState.currentGame.playerPlay = move;
        this.setComputerMove();
    },
    setComputerMove () {
        const moves = [
            "piedra",
            "papel",
            "tijera"
        ];
        const randomMove = moves[Math.floor(Math.random() * 3)];
        const currentState = this.getState();
        currentState.currentGame.computerPlay = randomMove;
        this.pushToHistory(currentState.currentGame.playerPlay, randomMove);
    },
    whoWins (playerPlay, computerPlay) {
        if (playerPlay === computerPlay) return "tie";
        const win = playerPlay === "piedra" && computerPlay === "tijera" || playerPlay === "papel" && computerPlay === "piedra" || playerPlay === "tijera" && computerPlay === "papel";
        return win ? "win" : "loss";
    },
    pushToHistory (playerPlay, computerPlay) {
        const currentState = this.getState();
        const result = this.whoWins(playerPlay, computerPlay);
        if (result === "win") currentState.history.player++;
        if (result === "loss") currentState.history.computer++;
        this.setState(currentState);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"drinv":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initResultPage", ()=>initResultPage);
var _state = require("../state/state");
const ganasteImg = require("2e403ff75047d0eb");
const perdisteImg = require("fe1c75640e8e5b1");
const empateImg = require("13f51468c0e87196");
function initResultPage(params) {
    const div = document.createElement('div');
    const currentState = (0, _state.state).getState();
    const result = (0, _state.state).whoWins(currentState.currentGame.playerPlay, currentState.currentGame.computerPlay);
    let resultImg = '';
    let resultClass = '';
    if (result === 'win') {
        resultImg = ganasteImg;
        resultClass = 'win';
    }
    if (result === 'loss') {
        resultImg = perdisteImg;
        resultClass = 'loss';
    }
    if (result === 'tie') {
        resultImg = empateImg;
        resultClass = 'tie';
    }
    div.innerHTML = `
    <div class="result-container">
      <img class="result-image" src="${resultImg}" alt="Resultado: ${result}">
      <div class="score-board">
        <h2 class="score-title">Score</h2>
        <p class="score-p">Vos: ${currentState.history.player}</p>
        <p class="score-p">M\xe1quina: ${currentState.history.computer}</p>
      </div>
      <button-el class="play-again-button">Volver a Jugar</button-el>
    </div>
  `;
    const style = document.createElement('style');
    style.innerHTML = `
    .result-container {
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
  `;
    div.appendChild(style);
    const playAgainButton = div.querySelector('.play-again-button');
    if (playAgainButton) playAgainButton.addEventListener('click', ()=>{
        params.goTo('/instructions');
    });
    return div;
}

},{"../state/state":"gsPiT","2e403ff75047d0eb":"7lZtU","fe1c75640e8e5b1":"DqBVQ","13f51468c0e87196":"ebGWg","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7lZtU":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("ganaste.90fa3498.png") + "?" + Date.now();

},{}],"DqBVQ":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("perdiste.978d2e11.png") + "?" + Date.now();

},{}],"ebGWg":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("empate.c263bb07.png") + "?" + Date.now();

},{}],"96tSt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initShowdownPage", ()=>initShowdownPage);
var _state = require("../state/state");
function initShowdownPage(params) {
    const div = document.createElement('div');
    const currentState = (0, _state.state).getState();
    const playerMove = currentState.currentGame.playerPlay;
    const computerMove = currentState.currentGame.computerPlay;
    div.innerHTML = `
    <div class="showdown-container">
      <hand-el type="${computerMove}" class="computer-hand"></hand-el>
      <hand-el type="${playerMove}" class="player-hand"></hand-el>
    </div>
  `;
    const style = document.createElement('style');
    style.innerHTML = `
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
  `;
    div.appendChild(style);
    setTimeout(()=>{
        params.goTo('/result');
    }, 3000);
    return div;
}

},{"../state/state":"gsPiT","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1FmtC":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("fondo.28e0f3fa.png") + "?" + Date.now();

},{}],"fByw0":[function(require,module,exports,__globalThis) {
class Button extends HTMLElement {
    constructor(){
        super();
        this.render();
    }
    render() {
        const shadow = this.attachShadow({
            mode: 'open'
        });
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

},{}],"fQX5N":[function(require,module,exports,__globalThis) {
const piedra = require("878ad175d5fa77b8");
const papel = require("7d69c701bb446665");
const tijera = require("bf138eb3a5f5f2d1");
class Hand extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({
            mode: 'open'
        });
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

},{"878ad175d5fa77b8":"7FW59","7d69c701bb446665":"5MADw","bf138eb3a5f5f2d1":"f2u3F"}],"7FW59":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("piedra.a36d3994.png") + "?" + Date.now();

},{}],"5MADw":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("papel.f8e7dcbb.png") + "?" + Date.now();

},{}],"f2u3F":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("tijera.9fbd3f63.png") + "?" + Date.now();

},{}]},["3dtlh","gH3Lb"], "gH3Lb", "parcelRequire51b1", {}, "./", "/")

//# sourceMappingURL=PPT.34df32e0.js.map
