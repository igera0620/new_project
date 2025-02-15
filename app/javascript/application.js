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

function initialize() {
  const header = document.getElementById('main-header');
  const toggleHeaderButton = document.getElementById('toggle-header');
  const userMenuButton = document.getElementById('user-menu-button');
  const profileMenu = document.getElementById('profileMenu');
  const flashMessages = document.querySelectorAll('.flash');

  if (toggleHeaderButton) {
    console.log('Adding event listener for header toggle button');
    toggleHeaderButton.removeEventListener('click', toggleHeader);
    toggleHeaderButton.addEventListener('click', toggleHeader);
  } else {
    console.log('Header toggle button not found');
  }

  if (userMenuButton && profileMenu) {
    console.log('Adding event listener for user menu button');
    userMenuButton.removeEventListener('click', toggleUserMenu);
    userMenuButton.addEventListener('click', toggleUserMenu);

    document.removeEventListener('click', hideUserMenu);
    document.addEventListener('click', hideUserMenu);
  } else {
    console.log('User menu button or profile menu not found');
  }

  flashMessages.forEach(function(flash) {
    flash.addEventListener('click', function(event) {
      event.stopPropagation();
      console.log('Flash message clicked');
    });

    setTimeout(function() {
      flash.classList.add('hidden');
      console.log('Flash message hidden');
    }, 5000);
  });

  function toggleHeader(event) {
    event.stopPropagation();
    console.log('Header toggle button clicked');
    if (header.classList.contains('shown')) {
      header.classList.remove('shown');
      header.classList.add('hidden');
      console.log('Header hidden');
    } else {
      header.classList.remove('hidden');
      header.classList.add('shown');
      console.log('Header shown');
    }
  }

  function toggleUserMenu(event) {
    event.stopPropagation();
    profileMenu.classList.toggle('hidden');
    console.log('Profile menu toggled');
  }

  function hideUserMenu(event) {
    if (!profileMenu.classList.contains('hidden')) {
      profileMenu.classList.add('hidden');
      console.log('Profile menu hidden');
    }
  }
}

document.addEventListener('turbolinks:load', initialize);
document.addEventListener('turbo:load', initialize);
