const CACHE_NAME = 'ghgeniales-mathe-v2-9-1';
const RUNTIME = './v2_9_1_runtime_integration.js';
const ASSETS = [
  './', './index.html', './manifest.json', RUNTIME,
  './icon-192-v4.png', './icon-512-v4.png', './icon-512-maskable-v4.png',
  './v2_9_1_stochastik_ergebnisraum.js', './v2_9_1_stochastik_ereignisse.js', './v2_9_1_stochastik_vierfeldertafel.js',
  './v2_9_1_stochastik_bedingte_wk.js', './v2_9_1_stochastik_unabhaengigkeit.js', './v2_9_1_stochastik_statistikinterpretation.js',
  './v2_9_1_stochastik_kompetenzchecks.js',
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.allSettled(ASSETS.map(url => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function injectRuntime(response){
  if(!response || !response.ok) return response;
  const type = response.headers.get('content-type') || '';
  if(!type.includes('text/html')) return response;
  const text = await response.text();
  if(text.includes('./v2_9_1_runtime_integration.js')) return new Response(text,{status:response.status,statusText:response.statusText,headers:response.headers});

  const runtimeTag = `<script src="${RUNTIME}"></script>`;
  let injected = text.replace('</head>', `${runtimeTag}\n</head>`);

  const bootstrapMarker = `updateStatbar();\nrender();\n\n/* ============================================================\n   PWA:`;
  const bootstrapCode = `updateStatbar();\nrender();\n\n// V2.9.1 integration: pass lexical app references to the external bootstrap.\nif(window.GHGenialesV291Bootstrap) {\n  window.GHGenialesV291Bootstrap({ TOPICS, DIFFICULTY_BY_ID, render });\n}\n\n/* ============================================================\n   PWA:`;
  if(injected.includes(bootstrapMarker)) injected = injected.replace(bootstrapMarker, bootstrapCode);

  const headers = new Headers(response.headers);
  headers.set('content-type','text/html; charset=UTF-8');
  headers.delete('content-length');
  return new Response(injected,{status:response.status,statusText:response.statusText,headers});
}

self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  const request = event.request;

  // App navigations are network-first. The response is transformed so the
  // existing lexical TOPICS/DIFFICULTY_BY_ID registry can safely receive the
  // V2.9.1 generators without replacing the 142KB legacy index.html file.
  if(request.mode === 'navigate'){
    event.respondWith(
      fetch(request)
        .then(async response => {
          const shell = await injectRuntime(response.clone());
          const cacheCopy = shell.clone();
          event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put('./index.html', cacheCopy)));
          return shell;
        })
        .catch(async () => {
          const cached = await caches.match('./index.html');
          if(!cached) return Response.error();
          return injectRuntime(cached);
        })
    );
    return;
  }

  // Other GET requests remain cache-first and are added to the cache after
  // successful network fetches so newly introduced modules work offline too.
  event.respondWith(
    caches.match(request).then(cached => {
      if(cached) return cached;
      return fetch(request).then(response => {
        if(response.ok){
          const clone = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request,clone)));
        }
        return response;
      });
    })
  );
});
