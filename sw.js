const cacheName = 'vanilla'
const staticAssets = [
  './',
  './index.html',
  './manifest.json',
  './src/img/dot.png',
  './src/img/logo.png',
  './src/js/audio.js',
  './src/js/controller.js',
  './src/js/index.js',
  './src/js/musicList.js',
  './src/style/style.css',
  './src/style/font/webfont.woff',
  './src/style/font/iconfont.css',
  './src/style/font/iconfont.js',
  './src/style/font/iconfont.svg',
  './src/style/font/iconfont.woff',
]

self.addEventListener('install', async (e) => {
  const cache = await caches.open(cacheName)
  await cache.addAll(staticAssets)
  return self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  self.clients.claim()
})

async function cacheFirst(req) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(req)
  return cached || fetch(req)
}

async function networkAndCache(req) {
  const cache = caches.open(cacheName)
  try {
    const fresh = await fetch(req)
    await cache.put(req, fresh.clone())
    return fresh
  } catch (err) {
    const cached = await caches.match(req)
    return cached
  }
}

self.addEventListener('fetch', (e) => {
  const req = e.request
  const url = new URL(req.url)

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req))
  } else {
    e.respondWith(networkAndCache(req))
  }
})
