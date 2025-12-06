let lastFocused = null;

export function setupModal(openBtn, closeBtn, modalEl) {
  const dialog = modalEl.querySelector('.modal__dialog');

  function open() {
    lastFocused = document.activeElement;
    modalEl.setAttribute('aria-hidden', 'false');
    modalEl.addEventListener('keydown', trapFocus);
    const firstInput = modalEl.querySelector('input, select, textarea, button');
    firstInput && firstInput.focus();
  }

  function close() {
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.removeEventListener('keydown', trapFocus);
    lastFocused && lastFocused.focus();
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = dialog.querySelectorAll('a, button, input, select, textarea');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  modalEl.addEventListener('click', (e) => { if (e.target === modalEl) close(); });

  return { open, close };
}
