let state = loadState();
let activeFilter = 'all';

function defaultState() {
  return { meta: {}, answers: {}, skipped: {}, photos: {}, custom: [] };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { ...defaultState(), ...saved };
  } catch {
    return defaultState();
  }
}

function saveState(showToast = false) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (showToast) toast('Saved');
  updateUI();
}

function qId(sectionIndex, qIndex) { return `q-${sectionIndex}-${qIndex}`; }

function render() {
  renderJumps();
  const host = document.getElementById('sections');
  host.innerHTML = '';
  let running = 1;

  sections.forEach((section, si) => {
    const wrap = document.createElement('section');
    wrap.className = 'section card';
    wrap.id = `section-${si}`;
    wrap.innerHTML = `<div class="section-head"><h2>${escapeHtml(section.title)}</h2><div class="section-count" data-count-section="${si}"></div></div><div class="questions"></div>`;
    const qHost = wrap.querySelector('.questions');

    section.questions.forEach((question, qi) => {
      const id = qId(si, qi);
      qHost.appendChild(makeQuestionCard({ id, number: running++, ...question, custom: false }));
    });
    host.appendChild(wrap);
  });

  if (state.custom.length) {
    const wrap = document.createElement('section');
    wrap.className = 'section card';
    wrap.id = 'section-custom';
    wrap.innerHTML = `<div class="section-head"><h2>13. Added During Walkthrough</h2><div class="section-count" data-count-custom></div></div><div class="questions"></div>`;
    const qHost = wrap.querySelector('.questions');
    state.custom.forEach(item => {
      qHost.appendChild(makeQuestionCard({ id: item.id, number: running++, text: item.text, hint: 'Custom question', critical: false, owner: 'Shared', custom: true }));
    });
    host.appendChild(wrap);
  }

  const photoHost = document.getElementById('photoGrid');
  photoHost.innerHTML = '';
  photoItems.forEach((text, i) => {
    const id = `photo-${i}`;
    const item = document.createElement('div');
    item.className = 'photo-item';
    item.innerHTML = `<input id="${id}" type="checkbox" ${state.photos[id] ? 'checked' : ''}><label for="${id}">${escapeHtml(text)}</label>`;
    item.querySelector('input').addEventListener('change', event => {
      state.photos[id] = event.target.checked;
      saveState();
    });
    photoHost.appendChild(item);
  });

  document.querySelectorAll('[data-meta]').forEach(element => {
    element.value = state.meta[element.dataset.meta] || '';
    element.addEventListener('input', () => {
      state.meta[element.dataset.meta] = element.value;
      saveState();
    });
  });

  updateUI();
}

function renderJumps() {
  const host = document.getElementById('jumpRow');
  host.innerHTML = '';
  sections.forEach((section, index) => {
    const link = document.createElement('a');
    link.className = 'jump-link';
    link.href = `#section-${index}`;
    link.textContent = section.short;
    host.appendChild(link);
  });
}

