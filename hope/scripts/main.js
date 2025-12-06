import { fetchHopeData } from './api.js';
import { setupModal } from './modal.js';
import { getPreferredLocation, setPreferredLocation } from './storage.js';

const openBtn = document.getElementById('openScheduleBtn');
const closeBtn = document.getElementById('closeScheduleBtn');
const modalEl = document.getElementById('scheduleModal');
const scheduleForm = document.getElementById('scheduleForm');
const preferredLocationSelect = document.getElementById('preferredLocation');
const homeCenters = document.getElementById('homeCenters');
const preferredCenterSelect = document.getElementById('preferredCenter');

const modal = setupModal(openBtn, closeBtn, modalEl);

init();

async function init() {
  try {
    const data = await fetchHopeData();
    
    if (preferredLocationSelect) fillLocationSelect(preferredLocationSelect, data.centers);
    if (preferredCenterSelect) fillLocationSelect(preferredCenterSelect, data.centers);

    const savedPref = getPreferredLocation();
    if (savedPref && preferredLocationSelect) preferredLocationSelect.value = savedPref;
    if (homeCenters) renderLocations(homeCenters, data.centers);

    const saveBtn = document.getElementById('savePrefsBtn');
    if (saveBtn && preferredLocationSelect) {
      saveBtn.addEventListener('click', () => {
        const val = preferredLocationSelect.value;
        setPreferredLocation(val);
        alert(val ? 'Preferred location saved.' : 'No location selected.');
      });
    }

    if (scheduleForm) {
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
    }
  } catch (err) {
    if (homeCenters) homeCenters.innerHTML = `<div class="card"><p>We’re sorry — data failed to load. Please refresh.</p></div>`;
  }
}

function fillLocationSelect(selectEl, centers) {
  selectEl.innerHTML = `<option value="">Select a location</option>` + centers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

function renderLocations(container, centers) {
  container.innerHTML = centers.map(c => `
    <article class="card">
      <h3>${c.name}</h3>
      <p class="meta">${c.address}</p>
      ${c.note ? `<p><span class="badge">Note</span> ${c.note}</p>` : ``}
    </article>
  `).join('');
}
