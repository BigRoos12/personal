/* Scroll Reveal Animation */
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "0.8s ease";
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* Animated Particles Background */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const mouse = { x: null, y: null };

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
    this.color = Math.random() > 0.5 ? "#b026ff" : "#39ff14";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (mouse.x && mouse.y) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        this.x -= dx / 25;
        this.y -= dy / 25;
      }
    }

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 180; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();

/* Skills Animation (Progress + Percent) */
const skillsSection = document.querySelector(".skills");
let skillsPlayed = false;

function animateSkills() {
  if (skillsPlayed) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight - 150) {
    skillsPlayed = true;

    document.querySelectorAll(".progress-bar").forEach(bar => {
      const value = bar.getAttribute("data-progress");
      bar.style.width = value + "%";
    });

    document.querySelectorAll(".percent").forEach(el => {
      const target = +el.getAttribute("data-target");
      let current = 0;

      const counter = setInterval(() => {
        current++;
        el.textContent = current + "%";

        if (current >= target) {
          el.textContent = target + "%";
          clearInterval(counter);
        }
      }, 15);
    });
  }
}

window.addEventListener("scroll", animateSkills);


const typingElement = document.querySelector(".typing-text");
const texts = [
  "Front-end Dev",
  "Python Lover",
  "WordPress Wizard",
  "Psychology Enthusiast",
  "Gen Z Mindset"
];
let textIndex = 0;
let charIndex = 0;
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 1500;

function type() {
  if (charIndex < texts[textIndex].length) {
    typingElement.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textIndex++;
    if (textIndex >= texts.length) textIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

// Start animation
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, newTextDelay);
});

