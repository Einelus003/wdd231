import { fetchHopeData } from './api.js';
import { setupModal } from './modal.js';

const openBtn = document.getElementById('openScheduleBtn');
const closeBtn = document.getElementById('closeScheduleBtn');
const modalEl = document.getElementById('scheduleModal');
const scheduleForm = document.getElementById('scheduleForm');
const preferredCenterSelect = document.getElementById('preferredCenter');
const locationsList = document.getElementById('locationsList');

const modal = setupModal(openBtn, closeBtn, modalEl);

init();

async function init() {
  try {
    const data = await fetchHopeData();
    fillLocationSelect(preferredCenterSelect, data.centers);
    renderLocations(data.centers);
    scheduleForm.addEventListener('submit', validateForm);
  } catch (err) {
    locationsList.innerHTML = `<div class="card"><p>Failed to load locations.</p></div>`;
  }
}

function fillLocationSelect(selectEl, centers) {
  selectEl.innerHTML = centers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

function renderLocations(centers) {
  locationsList.innerHTML = centers.map(c => `
    <article class="card">
      <h3>${c.name}</h3>
      <p class="meta">${c.address}</p>
      ${c.note ? `<p><span class="badge">Note</span> ${c.note}</p>` : ``}
    </article>
  `).join('');
}

function validateForm(e) {
  const required = ['patientName', 'dob', 'address', 'insuranceName', 'insuranceId', 'reason', 'preferredCenter'];
  for (const id of required) {
    const el = scheduleForm[id];
    if (!el || !el.value) {
      e.preventDefault();
      alert('Please fill all fields.');
      return;
    }
  }
}
