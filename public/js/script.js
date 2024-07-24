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