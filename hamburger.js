// global/hamburger.js

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");
    const closeBtn = document.getElementById("close-btn");
  
    menuBtn.addEventListener("click", () => {
      menu.classList.remove("hidden");
    });
  
    closeBtn.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  });
  