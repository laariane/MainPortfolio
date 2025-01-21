import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'
window.Alpine = Alpine

//animating
document.addEventListener('alpine:init', () => {
  Alpine.store('effects', {
    animateIn(el) {
      el.classList.remove('opacity-0', 'translate-y-5');
      el.classList.add('opacity-100', 'translate-y-0');
    },
    animateOut(el){
      el.classList.remove('opacity-100','translate-y-0');
      el.classList.add('opacity-0', 'translate-y-5');
    }
  });
});


Alpine.plugin(intersect)
Alpine.start()

