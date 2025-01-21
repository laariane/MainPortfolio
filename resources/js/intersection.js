
document.addEventListener('DOMContentLoaded', function () {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
      } else {
        entry.target.style.opacity = 0;
      }
    });
  }, options);

  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.style.opacity = 0.1; // Initial opacity
    observer.observe(project);
  });
});


