const CACHE_NAME = 'medswift-store-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './icon-192.png',
  './icon-512.png',
  // Add any fonts, images, or other assets here
];

// Install Event – caching assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event – clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch Event – respond with cached asset or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedRes => {
      return (
        cachedRes ||
        fetch(event.request).catch(() =>
          caches.match('./index.html') // fallback to home if offline and resource fails
        )
      );
    })
  );
});
