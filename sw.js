// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab8-cache-v1';

// core files we want available offline
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/styles/main.css',
  './assets/scripts/main.js',
  './assets/scripts/RecipeCard.js',
  './assets/images/icons/0-star.svg',
  './assets/images/icons/1-star.svg',
  './assets/images/icons/2-star.svg',
  './assets/images/icons/3-star.svg',
  './assets/images/icons/4-star.svg',
  './assets/images/icons/5-star.svg',
  './assets/images/icons/arrow-down.png',
  './assets/images/icons/icon-192x192.png',
  './assets/images/icons/icon-256x256.png',
  './assets/images/icons/icon-384x384.png',
  './assets/images/icons/icon-512x512.png',
  // the recipe json files
  'https://adarsh249.github.io/Lab8-Starter/recipes/1_50-thanksgiving-side-dishes.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/2_roasting-turkey-breast-with-stuffing.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/3_moms-cornbread-stuffing.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/6_one-pot-thanksgiving-dinner.json',
];

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // B6. add all the core files to the cache on install
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(
    // delete any old caches that don't match our current cache name
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
  // We added some known URLs to the cache above, but tracking down every
  // subsequent network request URL and adding it manually would be very taxing.
  // We will be adding all of the resources not specified in the intiial cache
  // list to the cache as they come in.
  /*******************************/
  // This article from Google will help with this portion. Before asking ANY
  // questions about this section, read this article.
  // NOTE: In the article's code REPLACE fetch(event.request.url) with
  //       fetch(event.request)
  // https://developer.chrome.com/docs/workbox/caching-strategies-overview/
  /*******************************/
  // B7. open the cache
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      // B8. cache first - check the cache before going to the network
      return cache.match(event.request).then(function (cached) {
        if (cached) {
          return cached;
        }
        // not in cache, fetch it then save a copy for next time
        return fetch(event.request).then(function (res) {
          cache.put(event.request, res.clone());
          return res;
        });
      });
    })
  );
});
