var cacheName = 'v3';

var cacheFiles = [
  './',
  './index.html',
  './css/styles.css',
  './js/main.js',
  './js/dbhelper.js',
  './js/restaurant_info.js',
  './js/tabIndexer.js',
]

self.addEventListener('install', function(e) {
  console.log('S W Installed');

  e.waitUntil(
      caches.open(cacheName).then(function(cache) {
      console.log('S W Caching Files');
      return cache.addAll(cacheFiles);
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log('S W activated');

  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName){

        if (thisCacheName !== cacheName) {
          console.log("S W removing old cache", thisCacheName);
          return cache.delete(thisCacheName);
        }

      }))
    })
  )

})

self.addEventListener('fetch', function(e) {
  console.log('S W Fetching', e.request.url);

  e.respondWith(
    caches.match(e.request).then(function(response){
      if (response) {
        console.log("SW Found in Cache", e.request.url);
        return response;
      }

      var requestClone = e.request.clone();
      fetch(requestClone).then(function(response) {
        if (!response) {
          console.log('SW  - No Response from fetch');
          return response;
        }

        var responseClone = response.clone();
        caches.open(cacheName).then(function(cache) {
          cache.put(e.request, responseClone);
          return response;
        });

      })
      .catch(function(err){
        console.log('Error while fetching/caching');
      })
    })
  )

})
