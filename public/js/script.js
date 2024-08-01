
/* Fixar header na rolagem */

window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

/* Menu mobile */

const menuMobile = document.querySelector('.menu-mobile');
const menuMobileContent = document.querySelector('.menu-mobile-content');
const links = menuMobileContent.querySelectorAll('a');

const closeMenu = document.querySelector('.close-menu');

closeMenu.addEventListener('click', () => {
  menuMobileContent.classList.remove('active');
});

menuMobile.addEventListener('click', () => {
  menuMobile.classList.toggle('active');
  menuMobileContent.classList.toggle('active');
});

links.forEach(link => {
  link.addEventListener('click', () => {
    menuMobileContent.classList.remove('active');
    menuMobile.classList.remove('active');
  });
});

/* Efeito na seção service */

document.querySelectorAll('.toggleBtn').forEach(button => {
    button.addEventListener('click', function() {
        const parentDiv = this.parentElement;
        const hiddenItems = parentDiv.querySelectorAll('ul li.hidden');
        const isVisible = hiddenItems.length === 0;

        if (isVisible) {
            parentDiv.querySelectorAll('ul li').forEach((item, index) => {
                if (index > 1) {
                    item.classList.add('hidden');
                }
            });
            this.textContent = 'Mostrar Mais';
        } else {
            hiddenItems.forEach(item => item.classList.remove('hidden'));
            this.textContent = 'Mostrar Menos';
        }
    });
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