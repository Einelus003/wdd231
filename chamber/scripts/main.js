
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


const modifiedSpan = document.getElementById("lastModified");
if (modifiedSpan) {
  modifiedSpan.textContent = document.lastModified;
}


const menuButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

document.getElementById("lastModified").textContent =
  document.lastModified;
