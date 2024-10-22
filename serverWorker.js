

// função inicial de instalação do serverworker
self.addEventListener('install', function(event) {
//   diz pro navegador esperar o download dos arquivos em cache pra prosseguir
    event.waitUntil(
        caches.open('massas-cache').then(function(cache) {
            return cache.addAll([
        // especifica quais arquivos estarão em cache para funcionamento offline
                'index.html',
                'style.css',
                'js.js',
                'manifest.json',
                  'teste.jpg',
            ]);
        })
    );
});

// recebe as requisições offline e retorna as informações em cache
// podemos incluir uma pagina de fallback caso a informação requisitada não esteja em cache
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

