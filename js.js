// script.js
console.log("Cardápio de Massas carregado!");

// Registrar o Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('Service Worker registrado com sucesso:', registration);
        }, function(error) {
            console.log('Falha ao registrar o Service Worker:', error);
        });
    });
}

// Detectar e exibir o botão de instalação
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Impede que o mini-infobar apareça no Chrome
    e.preventDefault();
    // Armazena o evento para que possa ser acionado posteriormente
    deferredPrompt = e;
    // Exibe um botão para instalação
    showInstallButton();
});

// Funções para mostrar e esconder o botão de instalação
function showInstallButton() {
    document.getElementById('installButton').style.display = 'block';
}

function hideInstallButton() {
    document.getElementById('installButton').style.display = 'none';
}

// Evento de clique do botão de instalação
document.getElementById('installButton').addEventListener('click', () => {
    // Esconde o botão de instalação
    hideInstallButton();
    // Mostra o prompt de instalação
    deferredPrompt.prompt();
    // Espera pela resposta do usuário
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou a instalação do PWA');
        } else {
            console.log('Usuário rejeitou a instalação do PWA');
        }
        deferredPrompt = null;
    });
});
