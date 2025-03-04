// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import "tailwindcss/tailwind.css";
import $ from "jquery";
import "./chatgpt";
import "./calendar";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./loading";
import "./fadein";

function initialize() {
  const header = document.getElementById("main-header");
  const userMenuButton = document.getElementById("user-menu-button");
  const profileMenu = document.getElementById("profileMenu");
  const flashMessages = document.querySelectorAll(".flash");

  if (!header) {
    console.warn("ヘッダーが見つかりません。");
    return;
  }

  setTimeout(() => {
    header.classList.remove("hidden");
    header.style.removeProperty("display");
    header.style.visibility = "visible";
    header.style.opacity = "1";
    console.log("ヘッダーは常に表示されるようになりました。");
  }, 100);

  if (userMenuButton && profileMenu) {
    userMenuButton.removeEventListener("click", toggleUserMenu);
    userMenuButton.addEventListener("click", toggleUserMenu);

    document.removeEventListener("click", hideUserMenu);
    document.addEventListener("click", hideUserMenu);
  }

  flashMessages.forEach(function (flash) {
    flash.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    setTimeout(function () {
      flash.classList.add("hidden");
    }, 5000);
  });

  function toggleUserMenu(event) {
    event.stopPropagation();
    profileMenu.classList.toggle("hidden");
  }

  function hideUserMenu(event) {
    if (!profileMenu.contains(event.target) && !userMenuButton.contains(event.target)) {
      profileMenu.classList.add("hidden");
    }
  }
}

document.addEventListener("turbo:load", initialize);
