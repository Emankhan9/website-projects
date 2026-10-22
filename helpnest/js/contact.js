document.addEventListener("DOMContentLoaded", () => {

  // ── TYPEWRITER ──
  const heading = document.querySelector('.contact-heading');
  const text = "Get In Touch";
  let i = 0;

  if (heading) {
    function type() {
      if (i < text.length) {
        heading.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }
    type();
  }

  // ── BACKGROUND SLIDESHOW ──
  const hero = document.querySelector(".contact-hero");
  const images = [
    (window.HN_ROOT||'') + "assets/contact.png",
    (window.HN_ROOT||'') + "assets/contact2.png"
  ];
  let current = 0;

  function changeBackground() {
    hero.style.backgroundImage = `
      linear-gradient(135deg, rgba(91,70,54,0.65), rgba(40,28,20,0.60)),
      url('${images[current]}')
    `;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
    current = (current + 1) % images.length;
  }

  changeBackground();
  setTimeout(() => setInterval(changeBackground, 4000), 4000);

});