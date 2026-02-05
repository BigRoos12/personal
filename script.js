/* Custom Cursor */
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

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
