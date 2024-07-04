console.log('Hola v1 desde el SW 👋');
const CACHE_NAME= 'Cache-v1';
// Guardo en el cache los archivos de la apliación

const CACHE_FILES = [
    '/',
    'index.html',
    'js/app.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'css/estilos.css',
    'img/imagen.jpg',
    'img/logo.png',
    'img/net.png'
];

// Cuando se instala el SW, Guardo todo en el cache
self.addEventListener('install', (e) => {
    const cache = caches.open( CACHE_NAME ).then( cache => {
        return cache.addAll( CACHE_FILES)
    })
    // Espero hasta que la promesa termine
    e.waitUntil( cache );
})

self.addEventListener('fetch', (e) => {
    // Primero Desde la WEb
    const respuesta = fetch( e.request).then( respNet => {
        // Aprovecho y guardo en el cache lo nuevo
        return caches.open( CACHE_NAME ).then( cache => {
            cache.put( e.request, respNet.clone() )
            return respNet;
        })
    // Si no hay conexion
    }).catch ( error => {
        return caches.match( e.request );
    })

    e.respondWith( respuesta);
})