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
