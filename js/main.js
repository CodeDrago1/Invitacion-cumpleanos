const intro = document.querySelector('#intro');
const invitation = document.querySelector('#invitation');
const openButton = document.querySelector('#openInvitation');

if (intro && invitation && openButton) {
  openButton.addEventListener('click', () => {
    invitation.classList.remove('is-hidden');
    document.body.style.overflow = 'auto';

    requestAnimationFrame(() => {
      intro.classList.add('opened');
      document.querySelector('.hero .reveal')?.classList.add('visible');
    });

    setTimeout(() => {
      intro.setAttribute('aria-hidden', 'true');
    }, 850);
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

const demoDate = new Date();
demoDate.setDate(demoDate.getDate() + 30);
demoDate.setHours(20, 0, 0, 0);

const fields = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds')
};

const countdownReady = Object.values(fields).every(Boolean);

function updateCountdown() {
  if (!countdownReady) return;
  const distance = demoDate.getTime() - Date.now();

  if (distance <= 0) {
    Object.values(fields).forEach((field) => { field.textContent = '00'; });
    return;
  }

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  fields.days.textContent = String(Math.floor(distance / day)).padStart(2, '0');
  fields.hours.textContent = String(Math.floor((distance % day) / hour)).padStart(2, '0');
  fields.minutes.textContent = String(Math.floor((distance % hour) / minute)).padStart(2, '0');
  fields.seconds.textContent = String(Math.floor((distance % minute) / 1000)).padStart(2, '0');
}

if (countdownReady) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// RSVP v0.6.0
// Pega aquí la URL del Web App de Google Apps Script cuando lo despleguemos.
const RSVP_ENDPOINT = '';

const rsvpOpen = document.querySelector('#rsvpOpen');
const rsvpModal = document.querySelector('#rsvpModal');
const rsvpClose = document.querySelector('#rsvpClose');
const rsvpDone = document.querySelector('#rsvpDone');
const rsvpForm = document.querySelector('#rsvpForm');
const rsvpFormView = document.querySelector('#rsvpFormView');
const rsvpSuccess = document.querySelector('#rsvpSuccess');
const rsvpStatus = document.querySelector('#rsvpStatus');
const rsvpSubmit = document.querySelector('#rsvpSubmit');
const companionField = document.querySelector('#companionField');
const companionName = document.querySelector('#companionName');

function openRsvp() {
  if (!rsvpModal) return;
  rsvpModal.classList.add('is-open');
  rsvpModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('rsvp-lock');
  setTimeout(() => document.querySelector('#rsvpName')?.focus(), 80);
}

function closeRsvp() {
  if (!rsvpModal) return;
  rsvpModal.classList.remove('is-open');
  rsvpModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('rsvp-lock');
}

rsvpOpen?.addEventListener('click', openRsvp);
rsvpClose?.addEventListener('click', closeRsvp);
rsvpDone?.addEventListener('click', closeRsvp);

rsvpModal?.addEventListener('click', (event) => {
  if (event.target === rsvpModal) closeRsvp();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && rsvpModal?.classList.contains('is-open')) closeRsvp();
});

document.querySelectorAll('input[name="acompanante"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    const show = radio.checked && radio.value === 'Sí';
    companionField?.classList.toggle('is-visible', show);
    if (companionName) companionName.required = show;
    if (!show && companionName) companionName.value = '';
  });
});

rsvpForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!rsvpForm.reportValidity()) return;

  const data = new FormData(rsvpForm);
  const payload = {
    nombre: String(data.get('nombre') || '').trim(),
    asistencia: String(data.get('asistencia') || ''),
    acompanante: String(data.get('acompanante') || 'No'),
    nombreAcompanante: String(data.get('nombreAcompanante') || '').trim(),
    mensaje: String(data.get('mensaje') || '').trim(),
    invitadoUrl: window.location.href,
    userAgent: navigator.userAgent
  };

  if (rsvpSubmit) rsvpSubmit.disabled = true;
  if (rsvpStatus) rsvpStatus.textContent = 'Enviando tu respuesta...';

  try {
    if (RSVP_ENDPOINT) {
      await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
    } else {
      // Modo demo hasta conectar Google Sheets.
      await new Promise((resolve) => setTimeout(resolve, 650));
      localStorage.setItem('rsvp-demo', JSON.stringify({ ...payload, fecha: new Date().toISOString() }));
    }

    rsvpFormView?.setAttribute('hidden', '');
    rsvpSuccess?.classList.add('is-visible');
    rsvpOpen?.classList.add('rsvp-confirmed');
    if (rsvpOpen) rsvpOpen.textContent = 'ASISTENCIA REGISTRADA ✓';
  } catch (error) {
    console.error('Error enviando RSVP:', error);
    if (rsvpStatus) rsvpStatus.textContent = 'No pudimos enviar tu respuesta. Intenta nuevamente.';
  } finally {
    if (rsvpSubmit) rsvpSubmit.disabled = false;
  }
});
