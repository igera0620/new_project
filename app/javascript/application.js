// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "tailwindcss/tailwind.css";

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('user-menu-button').addEventListener('click', function() {
    var menu = document.getElementById('profileMenu');
    menu.classList.toggle('hidden');
  });
});
