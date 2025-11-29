
import { places } from "../data/places.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("discover-grid");
  const messageEl = document.getElementById("visit-message");

  if (container && Array.isArray(places)) {
    places.forEach((place, index) => {
      const card = document.createElement("article");
      card.className = "discover-card";
     
      card.dataset.index = index;

      card.innerHTML = `
        <h2 class="place-title">${place.name}</h2>
        <figure class="place-figure">
          <img src="${place.image}" alt="${place.name}" loading="lazy" class="place-img">
        </figure>
        <address class="place-address">${place.address}</address>
        <p class="place-desc">${place.description}</p>
        <button class="learn-more">Learn More</button>
      `;

      container.appendChild(card);
    });

  } else {
    console.error("Discover: container missing ");
  }


  if (messageEl) {
    const lastVisit = localStorage.getItem("last-visit");
    const now = Date.now();

    if (!lastVisit) {
      messageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const diff = now - Number(lastVisit);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (days < 1) {
        messageEl.textContent = "Back so soon, Awesome!";
      } else if (days === 1) {
        messageEl.textContent = "You last visited 1 day ago.";
      } else {
        messageEl.textContent = `You last visited ${days} days ago.`;
      }
    }

    localStorage.setItem("last-visit", now);
  } else {
    console.warn("Discover:  element not found");
  }

  container?.addEventListener("click", (e) => {
    const btn = e.target.closest(".learn-more");
    if (!btn) return;
    const article = btn.closest(".discover-card");
    const idx = Number(article?.dataset.index ?? -1);
    if (idx >= 0) {
      const p = places[idx];
      
      alert(`${p.name}\n\n${p.description}\n\nAddress: ${p.address}`);
    }
  });
});
