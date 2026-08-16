const intro = document.querySelector('#intro');
const invitation = document.querySelector('#invitation');
const openButton = document.querySelector('#openInvitation');

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

// Animación de aparición al hacer scroll.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

// Fecha provisional para demostrar el funcionamiento del contador.
// Luego sustituiremos esta línea por la fecha real del evento.
const demoDate = new Date();
demoDate.setDate(demoDate.getDate() + 30);
demoDate.setHours(20, 0, 0, 0);

const fields = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds')
};

function updateCountdown() {
  const distance = demoDate.getTime() - Date.now();

  if (distance <= 0) {
    Object.values(fields).forEach((field) => field.textContent = '00');
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

updateCountdown();
setInterval(updateCountdown, 1000);
