document.addEventListener("turbo:load", () => {
  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length > 0) {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-1000");
      observer.observe(el);
    });
  }
});
