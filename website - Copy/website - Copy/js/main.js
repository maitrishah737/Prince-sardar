/* Prince Sardar — portfolio interactions */

const POSTER = 'https://cdn.corrra.com/users/qT1ZsEMr0uKHmyQ2hH8e4GJs8TkoCX3E/poster/';

const PROJECTS = [
  {
    id: '1BeNktMz-90kn4U57t2qX9QPDDVMwrGnz',
    tag: 'Commercial / VFX',
    title: 'AI-Powered Commercial',
    desc: 'Produced a cinematic AI powered commercial blending creative storytelling with advanced visual effects.',
    poster: 'a30bb23c-68ef-4f20-a119-f453f037ce83.png',
  },
  {
    id: '1R2dXlff9NmZeAPygRaxqw60jrgQsZmTp',
    tag: 'Brand promo',
    title: 'Restaurant Brand Film',
    desc: "Created a visually engaging promotional video highlighting the restaurant's ambiance, cuisine, and brand identity.",
    poster: 'dbbd56f3-3350-47c9-ac12-08d66edf5e2c.png',
  },
  {
    id: '1nrZkW_8j-TZDqB02lfnYYD1_cz3cBbhP',
    tag: 'Talking head',
    title: 'Fast-Paced Retention Edit',
    desc: 'Edited a fast paced talking head video with dynamic captions, smooth pacing, and audience-retention focused visuals.',
    poster: 'a02cdbf9-605e-4cb4-8f5c-5723a1336bb8.png',
  },
  {
    id: '1jm5RAmjutrHpmPKQGskl7wTbbCuZA-Oy',
    tag: 'Motion graphics',
    title: 'Talking Head × Motion',
    desc: 'Crafted an engaging talking head edit using motion graphics, transitions, and clean storytelling.',
    poster: 'd878a5e2-bf32-43c1-9925-40a1356d9c09.png',
  },
  {
    id: '19Xtjf8HqzreAfrX0xJHJLImMKXyp_rTx',
    tag: 'Brand promo',
    title: 'Premium Salon Promo',
    desc: 'Produced a premium promotional video showcasing salon services through elegant visuals and cinematic editing.',
    poster: 'e9752e3f-8522-40e4-a3b0-1c15264f7ae2.png',
  },
  {
    id: '1mPeETKXvNEVocXqqAWRIEo3KxPqKGRuz',
    tag: 'Talking head',
    title: 'Polished Talking-Head Cut',
    desc: 'Enhanced raw footage into an engaging talking-head video with polished audio, subtitles, and seamless transitions.',
    poster: '2800c9df-f51d-4b28-ac25-0f595a8e1c19.png',
  },
  {
    id: '1a3BRNtr1C9xi8YJDkGczax49mgAsfME_',
    tag: 'Product ad',
    title: 'High-Energy Product Ad',
    desc: 'Developed a high energy product advertisement emphasizing design, motion, and premium brand aesthetics.',
    poster: 'f865dcc1-9d57-462e-b049-aff8d452a240.png',
  },
];

/* ── work grid ── */
const grid = document.getElementById('workgrid');

PROJECTS.forEach((p, i) => {
  const card = document.createElement('button');
  card.className = 'card reveal';
  card.type = 'button';
  card.setAttribute('aria-label', `Play: ${p.title}`);
  card.innerHTML = `
    <span class="card__media">
      <img src="${POSTER}${p.poster}" alt="" loading="${i < 2 ? 'eager' : 'lazy'}">
      <span class="card__play" aria-hidden="true"><i>▶</i></span>
      <span class="card__len">${String(i + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}</span>
    </span>
    <span class="card__body">
      <span class="card__tag">${p.tag}</span>
      <span class="card__title">${p.title}</span>
      <span class="card__desc">${p.desc}</span>
    </span>`;
  card.addEventListener('click', () => openLightbox(p));
  grid.appendChild(card);
});

/* ── lightbox ── */
const lb = document.getElementById('lb');
const lbFrame = document.getElementById('lbframe');
const lbTitle = document.getElementById('lbtitle');
const lbOpen = document.getElementById('lbopen');
let lastFocus = null;

function openLightbox(p) {
  lastFocus = document.activeElement;
  lbFrame.src = `https://drive.google.com/file/d/${p.id}/preview`;
  lbTitle.textContent = `${p.tag} — ${p.title}`;
  lbOpen.href = `https://drive.google.com/file/d/${p.id}/view`;
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('lbclose').focus();
}

function closeLightbox() {
  lb.hidden = true;
  lbFrame.src = '';
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}

document.getElementById('lbclose').addEventListener('click', closeLightbox);
lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lb.hidden) closeLightbox(); });

/* ── reveal on scroll ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

/* ── nav stuck state ── */
const nav = document.getElementById('nav');
addEventListener('scroll', () => {
  nav.classList.toggle('is-stuck', scrollY > 24);
}, { passive: true });

/* ── mobile menu ── */
const burger = document.getElementById('burger');
const menu = document.getElementById('mobilemenu');
menu.hidden = true;

burger.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
  menu.hidden = open;
});
menu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    burger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  })
);

/* ── copy email ── */
const copyBtn = document.getElementById('copymail');
const toast = document.getElementById('toast');
let toastTimer;

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.mail);
    showToast('Email copied');
  } catch {
    showToast(copyBtn.dataset.mail);
  }
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2200);
}
