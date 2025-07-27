// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const navHeight = document.querySelector('nav').offsetHeight;

    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
// ===== PARTICLES BACKGROUND =====
const canvas = document.getElementById('bg-particles');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
let mouse = { x: width / 2, y: height / 2 };
const POINTS = 60;
const DIST = 120;
const points = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < POINTS; i++) {
  points.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7
  });
}

canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function draw() {
  ctx.clearRect(0, 0, width, height);
  // Draw lines
  for (let i = 0; i < POINTS; i++) {
    for (let j = i + 1; j < POINTS; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < DIST) {
        ctx.strokeStyle = 'rgba(0,212,170,' + (1 - dist / DIST) * 0.5 + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }
  // Draw points
  for (let i = 0; i < POINTS; i++) {
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#00d4aa';
    ctx.fill();
  }
}

function update() {
  for (let i = 0; i < POINTS; i++) {
    // Move points
    points[i].x += points[i].vx;
    points[i].y += points[i].vy;
    // Bounce from edges
    if (points[i].x < 0 || points[i].x > width) points[i].vx *= -1;
    if (points[i].y < 0 || points[i].y > height) points[i].vy *= -1;
    // Mouse interaction
    const dx = points[i].x - mouse.x;
    const dy = points[i].y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      points[i].x += dx / dist * 0.7;
      points[i].y += dy / dist * 0.7;
    }
  }
}

function animate() {
  update();
  draw();
  requestAnimationFrame(animate);
}
animate();
// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
  });
}

// Add scroll-based navigation highlighting
window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');
const scrollToTop = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  // Calculate scroll progress
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';

  // Show/hide scroll to top button
  if (window.scrollY > 300) {
    scrollToTop.classList.add('visible');
  } else {
    scrollToTop.classList.remove('visible');
  }

  // Animate elements on scroll
  animateOnScroll();
});

// Scroll to top functionality
scrollToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Enhanced scroll animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .hero-content h1, .hero-content h2, .hero-content p, .hero-content .cta-button');

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
      element.classList.add('visible');
    }
  });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  // Add animation classes to elements
  document.querySelectorAll('.about-text').forEach(el => el.classList.add('fade-left'));
  document.querySelectorAll('.about-stats').forEach(el => el.classList.add('fade-right'));
  document.querySelectorAll('.skill-card, .project-card').forEach(el => el.classList.add('fade-up'));
  document.querySelectorAll('.contact-info').forEach(el => el.classList.add('fade-left'));
  document.querySelectorAll('.contact-form').forEach(el => el.classList.add('fade-right'));

  // Trigger initial animation
  animateOnScroll();
});

// Add typing animation to hero text
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.innerHTML = '';

  const type = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };

  type();
};

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-content h1');
  const heroSubtitle = document.querySelector('.hero-content h2');

  if (heroTitle && heroSubtitle) {
    typeWriter(heroTitle, 'Abdallah Whaid', 150);
    setTimeout(() => {
      typeWriter(heroSubtitle, 'Graphic Designer & Print Specialist', 100);
    }, 2000);
  }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrollPosition = window.pageYOffset;

  if (hero) {
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
  }
});

// Add smooth reveal animation for project cards
const revealProject = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
};

const projectObserver = new IntersectionObserver(revealProject, {
  threshold: 0.1
});

document.querySelectorAll('.project-card').forEach(card => {
  projectObserver.observe(card);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');
const body = document.body;

function closeMenu() {
  navLinks.classList.remove('active');
  if (navOverlay) {
    navOverlay.classList.remove('active');
  }
  body.style.overflow = '';
  menuToggle.classList.remove('active');
}

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  if (navOverlay) {
    navOverlay.classList.toggle('active');
  }
  body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking overlay
if (navOverlay) {
  navOverlay.addEventListener('click', closeMenu);
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});