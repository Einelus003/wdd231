import { fetchHopeData } from './api.js';
import { setupModal } from './modal.js';
import { getFavorites, toggleFavorite } from './storage.js';

const openBtn = document.getElementById('openScheduleBtn');
const closeBtn = document.getElementById('closeScheduleBtn');
const modalEl = document.getElementById('scheduleModal');
const scheduleForm = document.getElementById('scheduleForm');
const preferredCenterSelect = document.getElementById('preferredCenter');

const providersGrid = document.getElementById('providersGrid');
const specialtyFilter = document.getElementById('specialtyFilter');
const locationFilter = document.getElementById('locationFilter');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');

const modal = setupModal(openBtn, closeBtn, modalEl);

let hopeData = { centers: [], doctors: [] };

init();

async function init() {
  try {
    hopeData = await fetchHopeData();
    fillLocationSelect(preferredCenterSelect, hopeData.centers);
    fillSpecialtyFilter(hopeData.doctors);
    fillLocationFilter(locationFilter, hopeData.centers);

    renderProviders(hopeData.doctors, hopeData.centers);

    specialtyFilter.addEventListener('change', applyFilters);
    locationFilter.addEventListener('change', applyFilters);
    clearFiltersBtn.addEventListener('click', () => {
      specialtyFilter.value = '';
      locationFilter.value = '';
      applyFilters();
    });

    scheduleForm.addEventListener('submit', (e) => {
      const required = ['patientName', 'dob', 'address', 'insuranceName', 'insuranceId', 'reason', 'preferredCenter'];
      for (const id of required) {
        const el = scheduleForm[id];
        if (!el || !el.value) {
          e.preventDefault();
          alert('Please fill all fields.');
          return;
        }
      }
    });
  } catch (err) {
    providersGrid.innerHTML = `<div class="card"><p>Failed to load providers data.</p></div>`;
  }
}

function fillLocationSelect(selectEl, centers) {
  selectEl.innerHTML = centers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

function fillSpecialtyFilter(doctors) {
  const specialties = [...new Set(doctors.map(d => d.specialty))].sort();
  specialtyFilter.innerHTML = `<option value="">All specialties</option>` + specialties.map(sp => `<option value="${sp}">${sp}</option>`).join('');
}

function fillLocationFilter(selectEl, centers) {
  selectEl.innerHTML = `<option value="">All locations</option>` + centers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

function renderProviders(doctors, centers) {
  const favorites = getFavorites();
  const centerNames = centers.reduce((acc, c) => (acc[c.id] = c.name, acc), {});
  providersGrid.innerHTML = doctors.map(d => {
    const locNames = d.locations.map(id => centerNames[id]).join(', ');
    const isFav = favorites.includes(d.name);
    return `
      <article class="card">
        <h3>${d.name}</h3>
        <p class="meta"><strong>Specialty:</strong> ${d.specialty}</p>
        <p><strong>Locations:</strong> ${locNames}</p>
        <p><strong>Primary care walk-ins:</strong> ${d.specialty === 'General Practitioner' ? 'Accepted' : 'By appointment'}</p>
        <div class="provider-actions">
          <button class="btn btn-secondary" data-fav="${d.name}">${isFav ? '★ Favorited' : '☆ Favorite'}</button>
          <button class="btn btn-primary" data-schedule="${d.name}">Request appointment</button>
        </div>
      </article>
    `;
  }).join('');

  providersGrid.querySelectorAll('[data-fav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-fav');
      const next = toggleFavorite(name);
      btn.textContent = next.includes(name) ? '★ Favorited' : '☆ Favorite';
    });
  });

  providersGrid.querySelectorAll('[data-schedule]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-schedule');
      modal.open();
      preferredCenterSelect.focus();
      alert(`Requesting appointment with ${name}`);
    });
  });
}

function applyFilters() {
  const sp = specialtyFilter.value;
  const loc = locationFilter.value;

  const filtered = hopeData.doctors
    .filter(d => (sp ? d.specialty === sp : true))
    .filter(d => (loc ? d.locations.includes(loc) : true));

  renderProviders(filtered, hopeData.centers);
}
