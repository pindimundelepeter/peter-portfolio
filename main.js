// Défilement automatique vers la page contact
document.querySelectorAll('[data-scroll]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById(a.dataset.scroll).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Formulaire de contact (Formspree) — sans changer de page
// Identifiant Formspree (formspree.io/f/xzedzapn)
const FORMSPREE_ID = "xzedzapn";
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const sendBtn = document.getElementById('send-btn');
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  if (!FORMSPREE_ID) {
    statusEl.style.color = '#f87171';
    statusEl.textContent = "Formulaire pas encore configuré (identifiant Formspree manquant).";
    return;
  }
  sendBtn.disabled = true; sendBtn.textContent = 'Envoi en cours…';
  statusEl.textContent = '';
  try {
    const res = await fetch('https://formspree.io/f/' + FORMSPREE_ID, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      statusEl.style.color = '#4ade80';
      statusEl.textContent = '✅ Votre message a bien été envoyé !';
      statusEl.style.fontWeight = '600';
      statusEl.style.fontSize = '16px';
      form.reset();
    } else {
      throw new Error('bad status');
    }
  } catch (err) {
    statusEl.style.color = '#f87171';
    statusEl.textContent = "❌ Erreur d'envoi. Réessaie ou écris-moi à pindimundelepeter@gmail.com.";
  } finally {
    sendBtn.disabled = false; sendBtn.textContent = 'Envoyer le message';
  }
});

// Filtre des projets
const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c => {
      c.style.display = (f === 'all' || c.dataset.category === f) ? '' : 'none';
    });
  });
});
