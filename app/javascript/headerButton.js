document.addEventListener("turbo:load", () => {
  const button = document.getElementById("toggle-header");
  const header = document.getElementById("main-header");

  if (header) {
    header.classList.add("hidden");
  }

  if (button && header) {
    button.addEventListener("click", () => {
      if (header.classList.contains("hidden")) {
        header.classList.remove("hidden");
      } else {
        header.classList.add("hidden");
      }
    });
  }
});
