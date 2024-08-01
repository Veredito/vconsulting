const cacheName = 'pwa-cache-v2'; // Inclua a versão no nome do cache
const cacheUrls = [
    "/", 
    "/pwa/manifest.json",
    "/pwa/img/image192.png",
    "/pwa/img/image512.png"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(cacheUrls);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                // Verifique se o recurso foi atualizado no servidor
                fetch(event.request).then((update) => {
                    if (update) {
                        caches.open(cacheName).then((cache) => {
                            cache.put(event.request, update.clone());
                        });
                    }
                });
                return response;
            }
            return fetch(event.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [cacheName];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
