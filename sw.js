const cacheName = 'v1';
const cacheAssets = [
    '/',
    '/js/main.js',
    '/css/main.css',
    '/images/',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png',
    '/maskable_icon.png',
    '/favicon.ico',
    '/safari-pinned-tab.svg',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                return cache.addAll(cacheAssets);
            })
    );
});

self.addEventListener('activate', (e) => {
    // clearing old cache
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        console.log('Service Worker is clearing old cache');
                        return caches.delete(cache);
                    };
                })
            );
        }),
    );
});

self.addEventListener('fetch', (event) => {
    let url = event.request.url;
    console.log(url);

    // check if request is made by chrome extensions or web page
    // if request is made from web page url, must contain http.. skip if not made with http protocol
    // if (!(event.request.url.indexOf('http') === 0)) return;
    if (
        url.startsWith('chrome-extension') ||
        url.includes('extension') ||
        !(url.indexOf('http') === 0)
    ) return;

    // event.respondWith(fetch(event.request).catch( () => caches.match(event.request))
    event.respondWith(
        caches.match(event.request).then((cacheResp) => {
            return cacheResp || fetch(event.request).then((fetchResp) => {
                let fetchRespClone = fetchResp.clone();
                caches.open('v1').then((cache) => {
                    cache.put(event.request, fetchRespClone);
                    return fetchResp;
                });

                return response;
            });
        }).catch(() => {
            return caches.match('/maskable_icon.png');
        })
    );
});


/* To update --------- */
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open('v2').then((cache) => {
//         return cache.addAll([
//           './sw-test/',
//           './sw-test/index.html',
//           './sw-test/style.css',
//           './sw-test/app.js',
//           './sw-test/image-list.js',


//           ...
//           // include other new resources for the new version...

//         ]);
//       })
//     );
//   });

/* Deleting old caches --------- */
// self.addEventListener('activate', (event) => {
//     var cacheKeeplist = ['v2'];

//     event.waitUntil(
//       caches.keys().then((keyList) => {
//         return Promise.all(keyList.map((key) => {
//           if (cacheKeeplist.indexOf(key) === -1) {
//             return caches.delete(key);
//           }
//         }));
//       })
//     );
//   });