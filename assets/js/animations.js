// ✅ Load saved progress and enable toggle
document.addEventListener("DOMContentLoaded", () => {
  const completedDays = JSON.parse(localStorage.getItem("completedDays") || "[]");

  document.querySelectorAll(".day-tile").forEach(tile => {
    const day = tile.dataset.day;
    if (completedDays.includes(Number(day))) {
      tile.classList.add("glowing");
    }

    const box = tile.querySelector(".progress-box");
    if (box) {
      box.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        tile.classList.toggle("glowing");

        const updatedDays = new Set(JSON.parse(localStorage.getItem("completedDays") || "[]"));
        if (tile.classList.contains("glowing")) {
          updatedDays.add(Number(day));
        } else {
          updatedDays.delete(Number(day));
        }
        localStorage.setItem("completedDays", JSON.stringify([...updatedDays]));
      });
    }
  });

  // ✅ Fade-in Animation (scroll-triggered)
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});



