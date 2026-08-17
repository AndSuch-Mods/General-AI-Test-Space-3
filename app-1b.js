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

