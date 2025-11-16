const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Toggle menu dan animasi silang
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Tutup menu jika klik di luar navbar atau toggle
document.addEventListener('click', (e) => {
  if (
    navMenu.classList.contains('active') && // hanya jika menu aktif
    !navMenu.contains(e.target) && // klik bukan di dalam navMenu
    !navToggle.contains(e.target) // klik bukan di toggle button
  ) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll untuk link navigasi
document.querySelectorAll('.nav ul li a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Tutup menu mobile jika aktif
        if(navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      }
    }
  });
});

const darkModeToggle = document.getElementById('darkModeToggle');

// Cek preferensi user saat load
if(localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav ul li a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const navLink = document.querySelector(`.nav ul li a[href="#${id}"]`);
    if(entry.isIntersecting){
      navLinks.forEach(link => link.classList.remove('active-link'));
      if(navLink) navLink.classList.add('active-link');
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));

const animatedElements = document.querySelectorAll('.fade-in');

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

animatedElements.forEach(el => animObserver.observe(el));

const progressBar = document.createElement('div');
progressBar.id = 'progressBar';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  const height = document.body.scrollHeight - window.innerHeight;
  const scrolled = (scroll / height) * 100;
  progressBar.style.width = `${scrolled}%`;
});

const lazyImages = document.querySelectorAll('.lazy-load');

const imgObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy-load');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imgObserver.observe(img));

