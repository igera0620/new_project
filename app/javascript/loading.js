document.addEventListener("turbo:load", () => {
  const forms = document.querySelectorAll("form.menu-form");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      const loadingSpinner = document.getElementById("loading-spinner");

      if (loadingSpinner) {
        loadingSpinner.classList.remove("hidden");
      }
    });
  });
});
