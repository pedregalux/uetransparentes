import { r as renderers } from './chunks/internal_BsTt5pTQ.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_DB1SpDa1.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/1.astro.mjs');
const _page1 = () => import('./pages/10.astro.mjs');
const _page2 = () => import('./pages/11.astro.mjs');
const _page3 = () => import('./pages/12.astro.mjs');
const _page4 = () => import('./pages/13.astro.mjs');
const _page5 = () => import('./pages/14.astro.mjs');
const _page6 = () => import('./pages/15.astro.mjs');
const _page7 = () => import('./pages/2.astro.mjs');
const _page8 = () => import('./pages/3.astro.mjs');
const _page9 = () => import('./pages/4.astro.mjs');
const _page10 = () => import('./pages/5.astro.mjs');
const _page11 = () => import('./pages/6.astro.mjs');
const _page12 = () => import('./pages/7.astro.mjs');
const _page13 = () => import('./pages/8.astro.mjs');
const _page14 = () => import('./pages/9.astro.mjs');
const _page15 = () => import('./pages/justicia.astro.mjs');
const _page16 = () => import('./pages/medioambiente.astro.mjs');
const _page17 = () => import('./pages/participacion.astro.mjs');
const _page18 = () => import('./pages/probidad.astro.mjs');
const _page19 = () => import('./pages/proyecto.astro.mjs');
const _page20 = () => import('./pages/seguimiento.astro.mjs');
const _page21 = () => import('./pages/transparencia.astro.mjs');
const _page22 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/1.astro", _page0],
    ["src/pages/10.astro", _page1],
    ["src/pages/11.astro", _page2],
    ["src/pages/12.astro", _page3],
    ["src/pages/13.astro", _page4],
    ["src/pages/14.astro", _page5],
    ["src/pages/15.astro", _page6],
    ["src/pages/2.astro", _page7],
    ["src/pages/3.astro", _page8],
    ["src/pages/4.astro", _page9],
    ["src/pages/5.astro", _page10],
    ["src/pages/6.astro", _page11],
    ["src/pages/7.astro", _page12],
    ["src/pages/8.astro", _page13],
    ["src/pages/9.astro", _page14],
    ["src/pages/justicia.astro", _page15],
    ["src/pages/medioambiente.astro", _page16],
    ["src/pages/participacion.astro", _page17],
    ["src/pages/probidad.astro", _page18],
    ["src/pages/proyecto.astro", _page19],
    ["src/pages/seguimiento.astro", _page20],
    ["src/pages/transparencia.astro", _page21],
    ["src/pages/index.astro", _page22]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "1210df9b-b562-493b-946a-8b45fb4b9d65"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
