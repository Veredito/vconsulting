document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('#services');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('serv_visible');
          observer.unobserve(entry.target); // Para observar apenas uma vez
        }
      });
    }, {
      threshold: 0.1 // Pode ajustar este valor conforme necessário
    });
  
    section.classList.add('serv_hidden'); // Inicialmente oculto
    observer.observe(section);
  });

  /* Modo escuro */
  
  document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.theme-toggle');
    const body = document.body;

    // Função para alternar o modo escuro
    function toggleDarkMode() {
      body.classList.toggle('dark_mode');
      if (body.classList.contains('dark_mode')) {
        localStorage.setItem('theme', 'dark_mode');
      } else {
        localStorage.setItem('theme', 'light_mode');
      }
    }

    // Adicionar evento de clique ao botão
    toggleButton.addEventListener('click', toggleDarkMode);

    // Verificar a preferência do tema no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light_mode') {
      body.classList.remove('dark_mode');
    } else {
      body.classList.add('dark_mode');
    }
  });

  // Seta de volta ao topo do site | Back to Top

(function() {
  "use strict";

  document.addEventListener('DOMContentLoaded', function() {
      var progressWraps = document.querySelectorAll('.progress-wrap, .circle.progress-wrap');
      var pathLengths = [];
      var progressPaths = [];

      progressWraps.forEach(function(progressWrap) {
          var progressPathsInWrap = progressWrap.querySelectorAll('path');
          progressPathsInWrap.forEach(function(progressPath) {
              var pathLength = progressPath.getTotalLength();
              pathLengths.push(pathLength);
              progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
              progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
              progressPath.style.strokeDashoffset = pathLength;
              progressPath.getBoundingClientRect();
              progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
              progressPaths.push(progressPath);
          });

          progressWrap.addEventListener('click', function(event) {
              event.preventDefault();
              scrollToTop();
          });
      });

      var updateProgress = function() {
          var scroll = window.scrollY;
          var height = document.documentElement.scrollHeight - window.innerHeight;

          pathLengths.forEach(function(pathLength, index) {
              var progress = pathLength - (scroll * pathLength / height);
              progressPaths[index].style.strokeDashoffset = progress;
          });

          progressWraps.forEach(function(progressWrap) {
              if (window.scrollY > 50) {
                  progressWrap.classList.add('active-progress');
              } else {
                  progressWrap.classList.remove('active-progress');
              }
          });
      };

      updateProgress();
      window.addEventListener('scroll', updateProgress);

function scrollToTop() {
  var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;

  if (currentPosition > 0) {
      if ('scrollBehavior' in document.documentElement.style) {
          window.scrollTo({
              top: 0,
              behavior: 'auto' // Usar 'auto' para desativar a rolagem suave temporariamente
          });
      } else {
          window.scrollTo(0, currentPosition - Math.min(currentPosition, 50));
          window.requestAnimationFrame(scrollToTop);
      }
  }
}


  });

})();