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

function makeQuestionCard({ id, number, text, hint, critical, owner, custom }) {
  const card = document.createElement('article');
  card.className = 'q-card';
  card.dataset.id = id;
  card.dataset.critical = critical ? 'true' : 'false';
  const ownerClass = owner === 'Sky' ? 'sky' : owner === 'Shared' ? 'shared' : 'csi';
  card.innerHTML = `
    <div class="q-top">
      <div class="num">${number}</div>
      <div class="q-text">
        ${escapeHtml(text)}
        <span class="badges">
          ${critical ? '<span class="badge critical">CRITICAL</span>' : ''}
          <span class="badge ${ownerClass}">${escapeHtml(owner)}</span>
        </span>
      </div>
      <label class="skip-wrap"><input type="checkbox" class="skip" ${state.skipped[id] ? 'checked' : ''}> Skip / known / N/A</label>
    </div>
    ${hint ? `<div class="hint">${escapeHtml(hint)}</div>` : ''}
    <textarea class="answer" placeholder="Answer / notes…">${escapeHtml(state.answers[id] || '')}</textarea>
    ${custom ? '<button class="action danger remove-custom" style="margin-top:9px;padding:6px 9px;font-size:.75rem;">Remove custom question</button>' : ''}
  `;
  card.querySelector('.answer').addEventListener('input', event => {
    state.answers[id] = event.target.value;
    saveState();
  });
  card.querySelector('.skip').addEventListener('change', event => {
    state.skipped[id] = event.target.checked;
    saveState();
  });
  if (custom) {
    card.querySelector('.remove-custom').addEventListener('click', () => {
      state.custom = state.custom.filter(question => question.id !== id);
      delete state.answers[id];
      delete state.skipped[id];
      saveState();
      render();
    });
  }
  return card;
}

function allCards() { return [...document.querySelectorAll('.q-card')]; }

function cardStatus(card) {
  const id = card.dataset.id;
  if (state.skipped[id]) return 'skipped';
  if ((state.answers[id] || '').trim()) return 'answered';
  return 'open';
}

function updateUI() {
  const cards = allCards();
  let answered = 0;
  let skipped = 0;
  let open = 0;
  let visible = 0;

  cards.forEach(card => {
    const status = cardStatus(card);
    card.classList.toggle('answered', status === 'answered');
    card.classList.toggle('skipped', status === 'skipped');
    answered += status === 'answered' ? 1 : 0;
    skipped += status === 'skipped' ? 1 : 0;
    open += status === 'open' ? 1 : 0;

    let show = activeFilter === 'all' || activeFilter === status;
    if (activeFilter === 'critical') show = card.dataset.critical === 'true' && status === 'open';
    card.classList.toggle('hidden', !show);
    if (show) visible += 1;
  });

  const done = answered + skipped;
  const percent = cards.length ? Math.round(done / cards.length * 100) : 0;
  document.getElementById('progressBar').style.width = `${percent}%`;
  document.getElementById('progressText').textContent = `${answered} answered · ${skipped} skipped · ${open} open`;
  document.getElementById('emptyState').style.display = visible ? 'none' : 'block';

  document.querySelectorAll('.section').forEach(section => {
    const sectionCards = [...section.querySelectorAll('.q-card')];
    const openCount = sectionCards.filter(card => cardStatus(card) === 'open').length;
    const countElement = section.querySelector('[data-count-section], [data-count-custom]');
    if (countElement) countElement.textContent = `${openCount} open / ${sectionCards.length}`;
    section.style.display = sectionCards.some(card => !card.classList.contains('hidden')) ? '' : 'none';
  });
}

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
    updateUI();
  });
});

document.getElementById('addQuestionBtn').addEventListener('click', addCustomQuestion);
document.getElementById('customQuestion').addEventListener('keydown', event => {
  if (event.key === 'Enter') addCustomQuestion();
});

function addCustomQuestion() {
  const input = document.getElementById('customQuestion');
  const text = input.value.trim();
  if (!text) return;
  state.custom.push({ id: `custom-${Date.now()}`, text });
  input.value = '';
  saveState();
  render();
  toast('Question added');
}

document.getElementById('copyBtn').addEventListener('click', async () => {
  const text = buildSummary();
  try {
    await navigator.clipboard.writeText(text);
    toast('Summary copied');
  } catch {
    fallbackCopy(text);
  }
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const text = buildSummary();
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = 'US-Pipe-Water-System-RIO-Walkdown-2026-08-17.md';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(anchor.href), 1000);
  toast('Notes exported');
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Clear every answer, skip mark, photo check, and walkthrough note on this device?')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  render();
  toast('Walkthrough reset');
});

function buildSummary() {
  const lines = [
    '# US Pipe — Water System Remote I/O Walkdown',
    '',
    `- **Date:** ${WALKDOWN_DATE}`
  ];
  if (state.meta.generalNotes) lines.push(`- **General notes:** ${state.meta.generalNotes.trim()}`);
  lines.push('');

  sections.forEach((section, sectionIndex) => {
    lines.push(`## ${section.title}`, '');
    section.questions.forEach((question, questionIndex) => {
      appendQuestion(lines, question, qId(sectionIndex, questionIndex));
    });
    lines.push('');
  });

  if (state.custom.length) {
    lines.push('## 13. Added During Walkthrough', '');
    state.custom.forEach(question => appendQuestion(lines, { text: question.text, owner: 'Shared' }, question.id));
    lines.push('');
  }

  lines.push('## Photo & Measurement Checklist', '');
  photoItems.forEach((text, index) => lines.push(`- [${state.photos[`photo-${index}`] ? 'x' : ' '}] ${text}`));
  lines.push('', '_Generated from the US Pipe Water System Remote I/O Quote Walkdown page._');
  return lines.join('\n');
}

function appendQuestion(lines, question, id) {
  const status = state.skipped[id] ? 'SKIPPED / KNOWN / N/A' : ((state.answers[id] || '').trim() ? 'ANSWERED' : 'OPEN');
  lines.push(`### ${question.text}`);
  lines.push(`**Owner:** ${question.owner || 'Shared'}  `);
  lines.push(`**Status:** ${status}`);
  if ((state.answers[id] || '').trim()) lines.push('', state.answers[id].trim());
  lines.push('');
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  toast('Summary copied');
}

function toast(message) {
  const element = document.getElementById('toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => element.classList.remove('show'), 1500);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}

render();
