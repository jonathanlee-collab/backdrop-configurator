const data = {
  packages: [
    {id:'bd01', sku:'BD01', name:'Mini Rectangle', price:499, meta:'4ft W × 6ft H', tag:'Entry point', bestFor:'Small home celebrations', copy:'A clean single-panel base', image:'assets/essential-demo.jpg', shape:'rectangle'},
    {id:'bd02', sku:'BD02', name:'Tall Rectangle', price:599, meta:'4ft W × 8ft H', tag:'Classic choice', bestFor:'Birthdays and dinners', copy:'More height for photos', image:'assets/essential-demo.jpg', shape:'rectangle'},
    {id:'bd03', sku:'BD03', name:'Classic Arch', price:649, meta:'4ft W × 7ft H', tag:'Soft silhouette', bestFor:'Elegant celebrations', copy:'A timeless curved profile', image:'assets/signature-demo.webp', shape:'arch'},
    {id:'bd04', sku:'BD04', name:'Organic Wave', price:679, meta:'4ft W × 7ft H', tag:'Modern shape', bestFor:'Stylish birthdays', copy:'A playful sculptural base', image:'assets/signature-demo.webp', shape:'wave'},
    {id:'bd05', sku:'BD05', name:'Round Feature', price:799, meta:'Approx. 6ft W × 6ft H', tag:'Photo moment', bestFor:'Milestones and ROM', copy:'A strong centrepiece shape', image:'assets/signature-demo.webp', shape:'round'},
    {id:'bd06', sku:'BD06', name:'Double Panel', price:999, meta:'4ft × 8ft + 3ft × 6ft', tag:'Hero product', bestFor:'Restaurant function rooms', copy:'Depth and balance for photos', image:'assets/signature-demo.webp', shape:'double'},
    {id:'bd07', sku:'BD07', name:'Arch + Rectangle', price:1049, meta:'Two-panel setup', tag:'Layered look', bestFor:'ROM and weddings', copy:'A fuller two-panel composition', image:'assets/signature-demo.webp', shape:'double'},
    {id:'bd08', sku:'BD08', name:'Layered Organic', price:1099, meta:'Two-panel setup', tag:'Premium base', bestFor:'Premium celebrations', copy:'A more styled foundation', image:'assets/luxe-demo.jpg', shape:'double'},
    {id:'bd09', sku:'BD09', name:'Triple Panel', price:1399, meta:'Three-panel setup', tag:'Showstopper base', bestFor:'Large photo moments', copy:'Maximum backdrop presence', image:'assets/luxe-demo.jpg', shape:'double'},
    {id:'bd10', sku:'BD10', name:'Corporate Wide', price:1499, meta:'Approx. 8ft W × 8ft H', tag:'Custom quote', bestFor:'Corporate and launches', copy:'A wider branded backdrop', image:'assets/luxe-demo.jpg', shape:'rectangle'}
  ],
  balloons: [
    {id:'none', name:'No balloon garland', price:0, meta:'Keep the backdrop clean'},
    {id:'mini', name:'Mini garland', price:150, meta:'3–4 ft accent'},
    {id:'small', name:'Small garland', price:180, meta:'4–5 ft accent'},
    {id:'medium', name:'Medium garland', price:280, meta:'7–8 ft organic styling'},
    {id:'large', name:'Large garland', price:380, meta:'10–12 ft fuller styling'},
    {id:'xl', name:'XL garland', price:520, meta:'14–16 ft statement styling'}
  ],
  balloonExtras: [
    {id:'chrome', name:'Chrome / pearl upgrade', price:80, meta:'Premium balloon finish'},
    {id:'extra-colour', name:'Extra balloon colour', price:30, meta:'Beyond 3 standard colours'},
    {id:'foil-accents', name:'Foil / star accents', price:50, meta:'Small feature details'}
  ],
  flowers: [
    {id:'none', name:'No flower shrub', price:0, meta:'Keep the backdrop clean'},
    {id:'small', name:'Small flower shrub', price:90, meta:'Front accent'},
    {id:'medium', name:'Standard flower shrub', price:160, meta:'Fuller arrangement'},
    {id:'large', name:'Feature floral cluster', price:260, meta:'More visual impact'}
  ],
  flowerPalettes: [
    {id:'white', name:'White / ivory / champagne'}, {id:'blush', name:'Blush / pink / nude'}, {id:'blue', name:'Blue / white'},
    {id:'purple', name:'Purple / lilac'}, {id:'green', name:'Green / white'}, {id:'red', name:'Red / burgundy'}, {id:'yellow', name:'Yellow / orange'}
  ],
  props: [
    {id:'silver-pedestal', name:'Silver cake pedestal', price:90, meta:'Single pedestal'},
    {id:'gold-pedestal', name:'Gold cake pedestal', price:90, meta:'Single pedestal'},
    {id:'white-pedestal', name:'White cake pedestal', price:90, meta:'Single pedestal'},
    {id:'acrylic-pedestal', name:'Clear acrylic pedestal', price:120, meta:'Single pedestal'},
    {id:'pedestal-set', name:'3-pedestal set', price:220, meta:'Bundle saving'},
    {id:'marquee', name:'Marquee number', price:150, meta:'3ft warm-white bulbs'},
    {id:'neon', name:'Happy Birthday neon', price:100, meta:'Warm neon sign'},
    {id:'giant-flower', name:'Giant flower', price:120, meta:'Statement prop'},
    {id:'giant-flowers', name:'Giant flowers ×3', price:300, meta:'Bundle saving'},
    {id:'cutout', name:'Custom theme cutout', price:180, meta:'Subject to artwork approval'},
    {id:'name-cutout', name:'Custom name cutout', price:120, meta:'Artwork approval required'},
    {id:'welcome-sign', name:'Welcome sign + easel', price:120, meta:'Signage prop'},
    {id:'carpet', name:'Standard carpet', price:120, meta:'Photo area finish'}
  ],
  lighting: [
    {id:'spotlights-2', name:'Floor spotlights ×2', price:80, meta:'Warm upward wash'},
    {id:'spotlights-4', name:'Floor spotlights ×4', price:140, meta:'Quantity saving'},
    {id:'spotlights-6', name:'Floor spotlights ×6', price:190, meta:'Fuller wash'},
    {id:'ball-stand', name:'Ball lighting stand ×1', price:90, meta:'Daylight bulb'},
    {id:'ball-stands-2', name:'Ball lighting stands ×2', price:160, meta:'Pair saving'},
    {id:'uplights-2', name:'LED uplights ×2', price:100, meta:'Venue ambience'}
  ]
};

const nameFonts = {
  classic: {label:'Classic serif', family:'Georgia, "Times New Roman", serif', weight:'700', style:'normal', spacing:'.05em'},
  modern: {label:'Modern clean', family:'Inter, Arial, sans-serif', weight:'900', style:'normal', spacing:'.08em'},
  playful: {label:'Playful rounded', family:'"Trebuchet MS", Arial, sans-serif', weight:'900', style:'normal', spacing:'.02em'},
  script: {label:'Elegant script', family:'"Brush Script MT", "Segoe Script", cursive', weight:'600', style:'italic', spacing:'0'}
};
const state = {step:1, package:'bd02', balloons:'none', balloonExtras:new Set(), flowers:'none', flowerPalette:'white', props:new Set(), lighting:new Set(), theme:'navy', nameFont:'classic', nameSize:100};
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const money = value => `RM ${value.toLocaleString('en-MY')}`;
const getItem = (group, id) => data[group].find(item => item.id === id);
const STORAGE_KEY = 'yl-events-backdrop-config-v17';
const MIN_ORDER = 699;

function saveDraft(showNotice = false) {
  const draft = {
    state: {step: state.step, package: state.package, balloons: state.balloons, balloonExtras: [...state.balloonExtras], flowers: state.flowers, flowerPalette: state.flowerPalette, props: [...state.props], lighting: [...state.lighting], theme: state.theme, nameFont: state.nameFont, nameSize: state.nameSize},
    fields: Object.fromEntries(['eventType','nameInput','dateInput','venueInput','setupTimeInput','eventEndTimeInput','messageInput','ageInput'].map(id => [id, $('#'+id).value]))
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    if (showNotice && $('#saveStatus')) $('#saveStatus').textContent = 'Saved on this device.';
  } catch (error) {
    if ($('#saveStatus')) $('#saveStatus').textContent = 'Device saving is unavailable.';
  }
}
function loadDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!draft || !draft.state) return;
    const saved = draft.state;
    const valid = (group, id) => Boolean(getItem(group, id));
    if (valid('packages', saved.package)) state.package = saved.package;
    if (valid('balloons', saved.balloons)) state.balloons = saved.balloons;
    if (Array.isArray(saved.balloonExtras)) state.balloonExtras = new Set(saved.balloonExtras.filter(id => valid('balloonExtras', id)));
    if (valid('flowers', saved.flowers)) state.flowers = saved.flowers;
    if (getItem('flowerPalettes', saved.flowerPalette)) state.flowerPalette = saved.flowerPalette;
    if (Array.isArray(saved.props)) state.props = new Set(saved.props.filter(id => valid('props', id)));
    if (Array.isArray(saved.lighting)) state.lighting = new Set(saved.lighting.filter(id => valid('lighting', id)));
    if (Number.isInteger(Number(saved.step))) state.step = Math.min(6, Math.max(1, Number(saved.step)));
    if (['blush','sage','navy','lavender','champagne'].includes(saved.theme)) state.theme = saved.theme;
    if (nameFonts[saved.nameFont]) state.nameFont = saved.nameFont;
    if (Number.isFinite(Number(saved.nameSize))) state.nameSize = Math.min(120, Math.max(80, Number(saved.nameSize)));
    if (draft.fields) Object.entries(draft.fields).forEach(([id, value]) => { if ($('#'+id) && typeof value === 'string') $('#'+id).value = value; });
    if ($('#nameFont')) $('#nameFont').value = state.nameFont;
    if ($('#nameSize')) $('#nameSize').value = state.nameSize;
    if ($('#flowerPalette')) $('#flowerPalette').value = state.flowerPalette;
  } catch (error) {
    try { localStorage.removeItem(STORAGE_KEY); } catch (storageError) {}
  }
}

function renderPackages() {
  $('#packageOptions').innerHTML = data.packages.map(item => `<button class="package-card ${state.package === item.id ? 'selected' : ''}" type="button" data-key="package" data-id="${item.id}" aria-pressed="${state.package === item.id}"><span class="package-photo"><img src="${item.image}" alt="${item.name} backdrop visual reference" loading="lazy"><span class="photo-badge">Demo reference</span></span><span class="package-top"><strong>${item.sku} · ${item.name}</strong><em>${item.tag}</em></span><span class="package-price">${money(item.price)}</span><span class="package-meta">${item.meta}</span><span class="package-copy">${item.copy}</span><span class="includes"><span class="included-label">Best for</span><span class="included-list">${item.bestFor}</span></span></button>`).join('');
}
function renderSingleOptions(container, items, key) {
  $(container).innerHTML = items.map(item => `<button class="option-card ${state[key] === item.id ? 'selected' : ''}" type="button" data-key="${key}" data-id="${item.id}" aria-pressed="${state[key] === item.id}"><span class="option-icon">${key === 'balloons' ? '◌' : '✿'}</span><span class="option-content"><strong>${item.name}</strong><small>${item.meta}</small></span><span class="option-price">${item.price ? `+${money(item.price)}` : 'Included'}</span></button>`).join('');
}
function renderChecks(container, items, key) {
  $(container).innerHTML = items.map(item => { const added = state[key].has(item.id); return `<button class="option-card ${added ? 'selected' : ''}" type="button" data-check="${key}" data-id="${item.id}" aria-pressed="${added}"><span class="option-icon check-icon">${added ? '✓' : '+'}</span><span class="option-content"><strong>${item.name}</strong><small>${item.meta}</small></span><span class="option-price">+${money(item.price)}</span></button>`; }).join('');
}
function total() {
  let amount = getItem('packages', state.package).price;
  amount += getItem('balloons', state.balloons).price + getItem('flowers', state.flowers).price;
  for (const id of state.balloonExtras) amount += getItem('balloonExtras', id).price;
  for (const id of state.props) amount += getItem('props', id).price;
  for (const id of state.lighting) amount += getItem('lighting', id).price;
  return amount;
}
function formatDate(value) {
  if (!value) return 'TBC';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}
function updatePreview() {
  const packageItem = getItem('packages', state.package);
  $('#stage').className = `stage theme-${state.theme}`;
  $('#stageLabel').textContent = `${packageItem.sku} · ${packageItem.name} · ${packageItem.meta}`;
  $('#backdropLayer').className = `backdrop ${packageItem.shape}`;
  $('#secondaryPanel').classList.toggle('hidden', packageItem.shape !== 'double');
  $('#balloonLayer').className = `balloons size-${state.balloons}`;
  $('#balloonLayer').classList.toggle('hidden', state.balloons === 'none');
  $('#flowerLayer').className = `flowers size-${state.flowers}`;
  $('#flowerLayer').classList.toggle('hidden', state.flowers === 'none');
  $('#pedestalLayer').classList.toggle('hidden', ![...state.props].some(id => /pedestal/.test(id)));
  $('#marqueeLayer').classList.toggle('hidden', !state.props.has('marquee'));
  const hasStands = state.lighting.has('ball-stand') || state.lighting.has('ball-stands-2');
  $('#lightLeft').classList.toggle('hidden', !hasStands); $('#lightRight').classList.toggle('hidden', !hasStands);
  const hasSpots = [...state.lighting].some(id => id.startsWith('spotlights-'));
  $('#spotLeft').classList.toggle('hidden', !hasSpots); $('#spotRight').classList.toggle('hidden', !hasSpots);
  $('#previewName').textContent = $('#nameInput').value.trim().toUpperCase() || 'YOUR NAME';
  $('#previewAge').textContent = $('#ageInput').value.trim() || '7';
  $('#marqueeLayer').textContent = $('#ageInput').value.trim() || '7';
  $('#previewMessage').textContent = $('#messageInput').value.trim() || 'Happy Birthday';
  $('#sizeMark').textContent = packageItem.meta;
  const font = nameFonts[state.nameFont] || nameFonts.classic;
  Object.assign($('#previewName').style, {fontFamily:font.family, fontWeight:font.weight, fontStyle:font.style, letterSpacing:font.spacing});
  $('#nameSize').value = state.nameSize; $('#nameSizeValue').textContent = `${state.nameSize}%`;
  window.requestAnimationFrame(fitPreviewName);
}
function fitPreviewName() {
  const name = $('#previewName');
  if (!name || !name.parentElement) return;
  name.style.fontSize = '';
  const baseSize = parseFloat(window.getComputedStyle(name).fontSize) || 40;
  let size = baseSize * (state.nameSize / 100);
  const maxHeight = Math.max(58, name.parentElement.clientHeight * .3);
  name.style.fontSize = `${size}px`;
  while (name.scrollHeight > maxHeight && size > 12) { size -= 1; name.style.fontSize = `${size}px`; }
}
function updateIncludedNotes() {
  const palette = getItem('flowerPalettes', state.flowerPalette);
  const notes = {
    balloonIncludedNote: 'Balloon styling is priced separately. Up to 3 standard colours are included; finish upgrades are optional.',
    flowerIncludedNote: `Flower colour family: ${palette ? palette.name : 'White / ivory / champagne'}. Select a shrub size below.`,
    propIncludedNote: 'Pedestals, neons and custom props are reusable rental add-ons.',
    lightingIncludedNote: 'Choose a spotlight quantity; ball stands and LED uplights are separate add-ons.'
  };
  Object.entries(notes).forEach(([id, text]) => { if ($('#'+id)) $('#'+id).textContent = text; });
}
function updateSummary() {
  const packageItem = getItem('packages', state.package);
  const lines = [[`${packageItem.sku} · ${packageItem.name}`, packageItem.price]];
  if (state.balloons !== 'none') lines.push([getItem('balloons', state.balloons).name, getItem('balloons', state.balloons).price]);
  for (const id of state.balloonExtras) lines.push([getItem('balloonExtras', id).name, getItem('balloonExtras', id).price]);
  if (state.flowers !== 'none') {
    const palette = getItem('flowerPalettes', state.flowerPalette);
    lines.push([`${palette ? palette.name : 'Flower'} · ${getItem('flowers', state.flowers).name}`, getItem('flowers', state.flowers).price]);
  }
  for (const id of state.props) lines.push([getItem('props', id).name, getItem('props', id).price]);
  for (const id of state.lighting) lines.push([getItem('lighting', id).name, getItem('lighting', id).price]);
  $('#summaryLines').innerHTML = lines.map(([name, price]) => `<div class="summary-row"><span>${name}</span><strong>${money(price)}</strong></div>`).join('');
  $('#totalPrice').textContent = total().toLocaleString('en-MY');
  const mobileTotal = $('#mobileTotalPrice');
  if (mobileTotal) mobileTotal.textContent = total().toLocaleString('en-MY');
  const topTotal = $('#topTotal');
  if (topTotal) topTotal.textContent = total().toLocaleString('en-MY');
  const minimumNotice = $('#minimumOrderNotice');
  if (minimumNotice) {
    const gap = MIN_ORDER - total();
    minimumNotice.textContent = gap > 0 ? `Add ${money(gap)} in modules to reach the ${money(MIN_ORDER)} minimum before transport.` : `Minimum order met · transport quoted separately.`;
    minimumNotice.classList.toggle('below-minimum', gap > 0);
  }
  const upsellNudge = $('#upsellNudge');
  if (upsellNudge) {
    const suggestions = [];
    if (state.flowers === 'none') suggestions.push('a small flower shrub +RM90');
    if (![...state.props].some(id => /pedestal/.test(id))) suggestions.push('a cake pedestal +RM90');
    if (![...state.lighting].some(id => id.startsWith('spotlights-'))) suggestions.push('2 spotlights +RM80');
    upsellNudge.innerHTML = total() < 799 && suggestions.length ? `<strong>Complete your backdrop</strong><span>Add ${suggestions.slice(0, 2).join(' or ')}.</span>` : '';
  }
}
function render() {
  renderPackages(); renderSingleOptions('#balloonOptions', data.balloons, 'balloons'); renderChecks('#balloonExtraOptions', data.balloonExtras, 'balloonExtras'); renderSingleOptions('#flowerOptions', data.flowers, 'flowers'); renderChecks('#propOptions', data.props, 'props'); renderChecks('#lightingOptions', data.lighting, 'lighting'); $$('.theme-dot').forEach(dot => dot.classList.toggle('active', dot.dataset.theme === state.theme)); updateIncludedNotes(); updatePreview(); updateSummary(); saveDraft();
}
function showStep(step) {
  state.step = Math.max(1, Math.min(6, step));
  $$('.step-tab').forEach(tab => tab.classList.toggle('active', Number(tab.dataset.step) === state.step));
  $$('.step-panel').forEach(panel => panel.classList.toggle('active', Number(panel.dataset.panel) === state.step));
  $('#stepCount').textContent = `${state.step} / 6`; $('#prevBtn').disabled = state.step === 1;
  $('#nextBtn').textContent = state.step === 6 ? 'Review enquiry' : `Next: ${['', 'Balloons', 'Flowers', 'Props', 'Lighting', 'Event details'][state.step]}`;
  saveDraft();
}
function validateDetails() {
  const missing = [];
  if (!$('#nameInput').value.trim()) missing.push('your name');
  if (!$('#dateInput').value) missing.push('the event date');
  if (!$('#venueInput').value.trim()) missing.push('the venue or postcode');
  if (!$('#setupTimeInput').value) missing.push('the setup time');
  if (!$('#eventEndTimeInput').value) missing.push('the event end time');
  $('#formError').textContent = missing.length ? `Please add ${missing.join(', ')} before sending your enquiry.` : '';
  ['nameInput','dateInput','venueInput','setupTimeInput','eventEndTimeInput'].forEach(id => { const field = $('#'+id); field.classList.toggle('invalid', !field.value.trim()); });
  return !missing.length;
}
function enquiryText() {
  const packageItem = getItem('packages', state.package);
  const palette = getItem('flowerPalettes', state.flowerPalette);
  const selected = [`${packageItem.sku} ${packageItem.name} base — ${money(packageItem.price)}`];
  if (state.balloons !== 'none') selected.push(`${getItem('balloons', state.balloons).name} — ${money(getItem('balloons', state.balloons).price)}`);
  for (const id of state.balloonExtras) selected.push(`${getItem('balloonExtras', id).name} — ${money(getItem('balloonExtras', id).price)}`);
  if (state.flowers !== 'none') selected.push(`${palette ? palette.name : 'Flower palette'} · ${getItem('flowers', state.flowers).name} — ${money(getItem('flowers', state.flowers).price)}`);
  for (const id of state.props) selected.push(`${getItem('props', id).name} — ${money(getItem('props', id).price)}`);
  for (const id of state.lighting) selected.push(`${getItem('lighting', id).name} — ${money(getItem('lighting', id).price)}`);
  return `Hi YL Events, I would like to check availability for this backdrop setup.\n\nEvent: ${$('#eventType').value}\nDate: ${formatDate($('#dateInput').value)}\nVenue / postcode: ${$('#venueInput').value.trim() || 'TBC'}\nSetup time: ${$('#setupTimeInput').value || 'TBC'}\nEvent end time: ${$('#eventEndTimeInput').value || 'TBC'}\nName: ${$('#nameInput').value.trim() || 'TBC'}\nAge / number: ${$('#ageInput').value.trim() || '-'}\nMessage: ${$('#messageInput').value.trim() || '-'}\nColour direction: ${state.theme}\nName style: ${nameFonts[state.nameFont].label}, ${state.nameSize}% size\n\nSelected items:\n- ${selected.join('\n- ')}\n\nEstimated starting price: ${money(total())}\nMinimum order: ${money(MIN_ORDER)} before transport\nBooking terms: 50% deposit after availability confirmation; 2 artwork revisions included.\n\nPlease confirm availability, transport, venue access and final artwork. Thank you.`;
}
function openModal() {
  if (total() < MIN_ORDER) { $('#formError').textContent = `Please add ${money(MIN_ORDER - total())} in modules to reach the ${money(MIN_ORDER)} minimum before sending an enquiry.`; showStep(2); return; }
  if (!validateDetails()) { showStep(6); return; }
  $('#enquiryText').value = enquiryText(); $('#whatsappBtn').href = `https://wa.me/60123476878?text=${encodeURIComponent($('#enquiryText').value)}`;
  $('#modal').classList.remove('hidden'); $('#modal').setAttribute('aria-hidden', 'false'); $('#closeModal').focus();
}
function closeModal() { $('#modal').classList.add('hidden'); $('#modal').setAttribute('aria-hidden', 'true'); $('#enquiryBtn').focus(); }
function copyText(text, target) { navigator.clipboard.writeText(text).then(() => { $(target).textContent = 'Copied to clipboard.'; window.setTimeout(() => $(target).textContent = '', 1800); }).catch(() => { $(target).textContent = 'Copy is blocked by this browser.'; }); }

document.addEventListener('click', event => {
  const option = event.target.closest('[data-key]'); if (option) { state[option.dataset.key] = option.dataset.id; render(); return; }
  const check = event.target.closest('[data-check]'); if (check) { const set = state[check.dataset.check]; if (check.dataset.check === 'lighting' && check.dataset.id.startsWith('spotlights-')) { const wasSelected = set.has(check.dataset.id); [...set].filter(id => id.startsWith('spotlights-')).forEach(id => set.delete(id)); if (!wasSelected) set.add(check.dataset.id); } else { set.has(check.dataset.id) ? set.delete(check.dataset.id) : set.add(check.dataset.id); } render(); return; }
  const theme = event.target.closest('.theme-dot'); if (theme) { state.theme = theme.dataset.theme; $$('.theme-dot').forEach(dot => dot.classList.toggle('active', dot === theme)); updatePreview(); saveDraft(); return; }
  const tab = event.target.closest('.step-tab'); if (tab) showStep(Number(tab.dataset.step));
});
['nameInput','ageInput','messageInput'].forEach(id => $('#'+id).addEventListener('input', () => { updatePreview(); saveDraft(); }));
$('#nameFont').addEventListener('change', event => { state.nameFont = event.target.value; updatePreview(); saveDraft(); });
$('#nameSize').addEventListener('input', event => { state.nameSize = Number(event.target.value); $('#nameSizeValue').textContent = `${state.nameSize}%`; updatePreview(); saveDraft(); });
$('#flowerPalette').addEventListener('change', event => { state.flowerPalette = event.target.value; updateIncludedNotes(); updateSummary(); saveDraft(); });
$('#eventType').addEventListener('change', saveDraft);
['nameInput','dateInput','venueInput','setupTimeInput','eventEndTimeInput'].forEach(id => $('#'+id).addEventListener('input', () => { $('#'+id).classList.remove('invalid'); saveDraft(); }));
$('#nextBtn').addEventListener('click', () => state.step === 6 ? openModal() : showStep(state.step + 1)); $('#prevBtn').addEventListener('click', () => showStep(state.step - 1)); $('#enquiryBtn').addEventListener('click', openModal); $('#mobileEnquiryBtn').addEventListener('click', openModal);
$('#resetBtn').addEventListener('click', () => { state.step = 1; state.package = 'bd02'; state.balloons = 'none'; state.balloonExtras.clear(); state.flowers = 'none'; state.flowerPalette = 'white'; state.props.clear(); state.lighting.clear(); state.theme = 'navy'; state.nameFont = 'classic'; state.nameSize = 100; $('#nameInput').value = ''; $('#dateInput').value = ''; $('#venueInput').value = ''; $('#setupTimeInput').value = ''; $('#eventEndTimeInput').value = ''; $('#messageInput').value = 'Happy Birthday'; $('#ageInput').value = '7'; $('#nameFont').value = 'classic'; $('#nameSize').value = '100'; $('#flowerPalette').value = 'white'; $('#nameSizeValue').textContent = '100%'; $$('.theme-dot').forEach(dot => dot.classList.toggle('active', dot.dataset.theme === 'navy')); $('#formError').textContent = ''; showStep(1); render(); });
$('#copyBtn').addEventListener('click', () => copyText(enquiryText(), '#copyNotice')); $('#saveBtn').addEventListener('click', () => saveDraft(true)); $('#modalCopyBtn').addEventListener('click', () => copyText($('#enquiryText').value, '#copyNotice')); $('#closeModal').addEventListener('click', closeModal);
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#modal').classList.contains('hidden')) closeModal(); });
const today = new Date(); const todayString = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10); $('#dateInput').min = todayString;
window.addEventListener('resize', fitPreviewName);
loadDraft();
render(); showStep(state.step);
