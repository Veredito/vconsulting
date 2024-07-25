/* Efeito no background na seção 2 */

window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    var scale = Math.max(1, 1.5 - scrollY / window.innerHeight);
    var opacity = Math.min(1, scrollY / window.innerHeight);
    var headline = document.getElementById('headline');
    headline.style.transform = 'scale(' + scale + ')';
    headline.style.opacity = opacity;

    // Parallax effect for background images
    var parallaxElements = document.querySelectorAll('.img');
    parallaxElements.forEach(function(element) {
        var size = 300 + scrollY * 0.1; // Adjust the multiplier for a more or less pronounced effect
        element.style.backgroundSize = size + 'px';
    });
});

/* Efeito de transição na seção 3 */

window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    var windowHeight = window.innerHeight;

    // Seleciona o ícone e a div .ft_info
    var icon = document.querySelector('#ft_box i');
    var ftInfo = document.querySelector('.ft_info');

    // Obtém a posição do elemento em relação ao topo da página
    var ftBoxTop = document.getElementById('ft_box').getBoundingClientRect().top + window.scrollY;

    // Calcula o ponto em que o ícone e a div .ft_info devem começar a aparecer
    var iconStart = ftBoxTop - windowHeight * 1.2; // Começa a aparecer quando metade do elemento entra na viewport
    var infoStart = ftBoxTop - windowHeight * 1; // Começa a aparecer um pouco depois do ícone

    // Calcula o progresso da rolagem
    var iconProgress = Math.min(1, Math.max(0, (scrollY - iconStart) / windowHeight));
    var infoProgress = Math.min(1, Math.max(0, (scrollY - infoStart) / windowHeight));

    // Atualiza as propriedades de transformação e opacidade
    icon.style.transform = 'translateX(' + (50 - iconProgress * 50) + 'px)';
    icon.style.opacity = iconProgress;

    ftInfo.style.transform = 'translateX(' + (-50 + infoProgress * 50) + 'px)';
    ftInfo.style.opacity = infoProgress;
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