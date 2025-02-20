// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "tailwindcss/tailwind.css";
import $ from 'jquery';
import "./chatgpt"; 
import './calendar';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import "./loading";
import "./fadein";
import "./headerButton.js"

function initialize() {
  const header = document.getElementById('main-header');
  const toggleHeaderButton = document.getElementById('toggle-header');
  const userMenuButton = document.getElementById('user-menu-button');
  const profileMenu = document.getElementById('profileMenu');
  const flashMessages = document.querySelectorAll('.flash');

  if (toggleHeaderButton) {
    toggleHeaderButton.removeEventListener('click', toggleHeader);
    toggleHeaderButton.addEventListener('click', toggleHeader);
  }

  if (userMenuButton && profileMenu) {
    userMenuButton.removeEventListener('click', toggleUserMenu);
    userMenuButton.addEventListener('click', toggleUserMenu);

    document.removeEventListener('click', hideUserMenu);
    document.addEventListener('click', hideUserMenu);
  }

  flashMessages.forEach(function(flash) {
    flash.addEventListener('click', function(event) {
      event.stopPropagation();
    });

    setTimeout(function() {
      flash.classList.add('hidden');
    }, 5000);
  });

  function toggleHeader(event) {
    event.stopPropagation();
    if (header.classList.contains('shown')) {
      header.classList.remove('shown');
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
      header.classList.add('shown');
    }
  }

  function toggleUserMenu(event) {
    event.stopPropagation();
    profileMenu.classList.toggle('hidden');
  }

  function hideUserMenu(event) {
    if (!profileMenu.classList.contains('hidden')) {
      profileMenu.classList.add('hidden');
    }
  }
}

document.addEventListener('turbolinks:load', initialize);
document.addEventListener('turbo:load', initialize);
