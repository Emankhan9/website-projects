document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     STATS COUNT ANIMATION
  =============================== */
  const statsSection = document.querySelector(".about-stats");

  if (statsSection) {
    let counted = false;

    function startCounting() {
      if (counted) return;
      counted = true;

      document.querySelectorAll('.stat-box').forEach((box, i) => {
        setTimeout(() => box.classList.add('visible'), i * 150);
      });

      document.querySelectorAll(".counter[data-target]").forEach(num => {
        const target = +num.dataset.target;
        let current = 0;
        const increment = target / 80;
        num.textContent = "0";

        function update() {
          if (current < target) {
            current += increment;
            num.textContent = Math.ceil(current);
            requestAnimationFrame(update);
          } else {
            num.textContent = target + "+";
          }
        }
        update();
      });
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) startCounting();
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  /* ===============================
     HERO BACKGROUND SLIDESHOW
  =============================== */
  const hero = document.querySelector(".about-hero");

  if (hero) {
    const images = [
      (window.HN_ROOT||'') + "assets/image1.png",
      (window.HN_ROOT||'') + "assets/ab3.png",
      (window.HN_ROOT||'') + "assets/image2.png",
    ];
    let currentIndex = 0;

    function changeBackground() {
      hero.style.backgroundImage =
        'linear-gradient(135deg, rgba(91,70,54,0.65), rgba(40,28,20,0.60)), url("' +
        images[currentIndex] + '")';
      currentIndex = (currentIndex + 1) % images.length;
    }

    changeBackground();
    setInterval(changeBackground, 4000);
  }

});