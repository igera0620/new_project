// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "tailwindcss/tailwind.css";
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('main-header');
  const toggleHeaderButton = document.getElementById('toggle-header');
  
  toggleHeaderButton.addEventListener('click', function() {
    if (header.classList.contains('hidden')) {
      header.classList.remove('hidden');
    } else {
      header.classList.add('hidden');
    }
  });

  document.getElementById('user-menu-button').addEventListener('click', function() {
    var menu = document.getElementById('profileMenu');
    menu.classList.toggle('hidden');
  });
});