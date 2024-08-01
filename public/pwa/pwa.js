// Registrar o Service Worker

if ('serviceWorker' in navigator && 'caches' in window) {
    navigator.serviceWorker.register('/pwa/service-worker.js')
        .then((registration) => {
            // console.log('Service Worker registrado com sucesso');
            registration.addEventListener('updatefound', () => {
                const installingWorker = registration.installing;
                if (installingWorker) {
                    installingWorker.addEventListener('statechange', () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // Avisa ao Service Worker antigo para ativar o novo
                                navigator.serviceWorker.controller.postMessage({ action: 'skipWaiting' });
                            }
                        }
                    });
                }
            });
        })
        .catch((error) => {
            console.error('Erro ao registrar Service Worker:', error);
        });
}


// Manifest   

const manifestLink = document.createElement('link');
manifestLink.rel = 'manifest';
manifestLink.href = '/pwa/manifest.json';
document.head.appendChild(manifestLink);
   
// Inserir mensagem de instalação do app e controle de cache
   
   var isIos=/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
   if (isIos && !window.navigator.standalone) {
    var iosInstallMessage=document.createElement('div');
    iosInstallMessage.innerHTML='<div class="msgios"> <img src="/pwa/img/image192.png" width="60" height="60" alt="Logo App"> <span> Baixe nosso App, toque no ícone de compartilhamento e selecione "Adicionar à Tela Inicial". </span> </div>';
    iosInstallMessage.classList.add('ios-install-message');
    var closeButton=document.createElement('button');
    closeButton.innerHTML='<span class="msgios_close"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z"></path></g></svg></span>';
    closeButton.onclick=function() {
     iosInstallMessage.style.display='none';
     localStorage.setItem('promptClosed', 'true');
    };
    iosInstallMessage.appendChild(closeButton);
    document.body.insertBefore(iosInstallMessage, document.body.firstChild);
    // Verificar se o prompt foi fechado nas últimas 24 horas ao carregar a página
    document.addEventListener("DOMContentLoaded", function() {
     var promptClosed=localStorage.getItem('promptClosed');
     if (promptClosed) {
      iosInstallMessage.style.display='none';
     } else {
      iosInstallMessage.style.display='flex'; // Defina para 'flex' se não fechado nas últimas 24 horas
     }
    });
   } else {
    var beforeInstallPrompt=null;
    var promptClosedKey='promptClosed';
    window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);

    function eventHandler(event) {
     beforeInstallPrompt=event;
     // Verifica se o prompt foi fechado nas últimas 24 horas e se não está no modo display selecionado
     var promptClosed=localStorage.getItem(promptClosedKey);
     var isDisplay=window.matchMedia('(display-mode: standalone)').matches;
     if (!promptClosed && !isDisplay) {
      document.getElementById("installBtnPWA").removeAttribute("disabled");
      document.getElementById("installBtnPWA_buttons").style.display='flex';
     }
    }

    function errorHandler(event) {
     console.log("error: " + event);
    }

    function instalar() {
     if (beforeInstallPrompt) beforeInstallPrompt.prompt();
    }

    function fecharPrompt() {
     beforeInstallPrompt=null;
     localStorage.setItem(promptClosedKey, 'true');
     document.getElementById("installBtnPWA_buttons").style.display='none';
    }
   }
     
   // Verificar se o prompt foi fechado nas últimas 24 horas ao carregar a página
   document.addEventListener("DOMContentLoaded", function() {
    var promptClosed=localStorage.getItem(promptClosedKey);
    if (promptClosed) {
     document.getElementById("installBtnPWA_buttons").style.display='none';
    }
   });  