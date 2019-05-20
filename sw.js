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
  './src/style/font/webfont.ttf',
  './src/style/font/iconfont.css',
]

self.addEventListener('install', async () => {
  const cache = await caches.open(cacheName)
  await cache.addAll(staticAssets)
  return self.skipWaiting()
})

self.addEventListener('activate', () => {
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).then(response => caches.open('v1').then((cache) => {
      cache.put(event.request, response.clone())
      return response
    }))),
  )
})
