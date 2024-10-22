
// registrar o Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('serverWorker.js').then(function(registration) {
            console.log('Service Worker registrado com sucesso:', registration);
        }, function(error) {
            console.log('Falha ao registrar o Service Worker:', error);
        });
    });
}

// detectar e exibir o botão de instalação
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Impede que infobar de instalação apareça no chrome
    e.preventDefault();
    // armazena o evento para ser acionado depois
    deferredPrompt = e;
    // exibe um botão para instalação
    showInstallButton();
});

// mostrar e esconder o botão de instalação
function showInstallButton() {
    document.getElementById('installButton').style.display = 'block';
}

function hideInstallButton() {
    document.getElementById('installButton').style.display = 'none';
}

// clique do botão de instalação
document.getElementById('installButton').addEventListener('click', () => {
    // Esconde o botão de instalação
    hideInstallButton();
    // mostra o prompt de instalação
    deferredPrompt.prompt();
    // resposta do usuário
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou a instalação do PWA');
        } else {
            console.log('Usuário rejeitou a instalação do PWA');
        }
        deferredPrompt = null;
    });
});
