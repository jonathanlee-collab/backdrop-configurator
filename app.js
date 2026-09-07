const data = {
  packages: [
    {id:'essential', name:'Essential', price:750, meta:'4ft × 8ft panel', tag:'Most popular', copy:'A polished starting setup', image:'assets/essential-demo.jpg', source:'CL Decor', sourceUrl:'https://www.cldecor.com/draping', includes:['Custom printed panel','Balloon garland','Happy Birthday neon','Marquee number','Cake pedestal','2 spotlights'], shape:'rectangle'},
    {id:'signature', name:'Signature', price:1050, meta:'4ft × 6ft + 2.5ft × 4.5ft', tag:'Two-panel look', copy:'More depth for photographs', image:'assets/signature-demo.webp', source:'Dreamland Art and Play', sourceUrl:'https://www.dreamlandartandplay.com/', includes:['Two printed panels','2 balloon garlands','Happy Birthday neon','Marquee number','Cake pedestal','2 spotlights'], shape:'double'},
    {id:'luxe', name:'Luxe', price:1650, meta:'4ft × 8ft + 3ft × 6ft', tag:'Feature setup', copy:'A fuller statement backdrop', image:'assets/luxe-demo.jpg', source:'Esthero', sourceUrl:'https://esthero.fr/collections/toile-de-fond-de-nouvel-an', includes:['Two printed panels','2 balloon garlands','2 helium bunches','Happy Birthday neon','Marquee number','Floral shrubs','2 spotlights'], shape:'double'}
  ],
  balloons: [
    {id:'none', name:'No extra balloons', price:0, meta:'Use package inclusions'},
    {id:'small', name:'Small garland', price:180, meta:'4–5 ft accent'},
    {id:'medium', name:'Medium garland', price:280, meta:'7–8 ft organic styling'},
    {id:'large', name:'Statement garland', price:380, meta:'10–12 ft fuller styling'}
  ],
  flowers: [
    {id:'none', name:'No extra flowers', price:0, meta:'Keep the backdrop clean'},
    {id:'small', name:'Small flower shrub', price:90, meta:'Front accent'},
    {id:'medium', name:'Standard flower shrub', price:160, meta:'Fuller arrangement'},
    {id:'large', name:'Feature floral cluster', price:260, meta:'More visual impact'}
  ],
  props: [
    {id:'pedestal', name:'Cake pedestal', price:90, meta:'Silver or gold'},
    {id:'marquee', name:'Marquee number', price:150, meta:'3ft warm-white bulbs'},
    {id:'neon', name:'Happy Birthday neon', price:100, meta:'Warm neon sign'},
    {id:'cutout', name:'Custom theme cutout', price:180, meta:'Subject to artwork approval'}
  ],
  lighting: [
    {id:'stands', name:'Ball light stands ×2', price:160, meta:'Daylight bulbs'},
    {id:'spots', name:'Floor spotlights ×2', price:80, meta:'Warm upward wash'},
    {id:'uplight', name:'LED uplights ×2', price:100, meta:'Venue ambience'}
  ]
};

const nameFonts = {
  classic: {label:'Classic serif', family:'Georgia, "Times New Roman", serif', weight:'700', style:'normal', spacing:'.05em'},
  modern: {label:'Modern clean', family:'Inter, Arial, sans-serif', weight:'900', style:'normal', spacing:'.08em'},
  playful: {label:'Playful rounded', family:'"Trebuchet MS", Arial, sans-serif', weight:'900', style:'normal', spacing:'.02em'},
  script: {label:'Elegant script', family:'"Brush Script MT", "Segoe Script", cursive', weight:'600', style:'italic', spacing:'0'}
};
const state = {step:1, package:'essential', balloons:'none', flowers:'none', props:new Set(), lighting:new Set(), theme:'navy', nameFont:'classic', nameSize:100};
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const money = value => `RM ${value.toLocaleString('en-MY')}`;
const getItem = (group, id) => data[group].find(item => item.id === id);

function renderPackages() {
  $('#packageOptions').innerHTML = data.packages.map(item => `<button class="package-card ${state.package === item.id ? 'selected' : ''}" type="button" data-key="package" data-id="${item.id}" aria-pressed="${state.package === item.id}"><span class="package-photo"><img src="${item.image}" alt="${item.name} package visual reference" loading="lazy"><span class="photo-badge">Demo reference</span></span><span class="package-top"><strong>${item.name}</strong><em>${item.tag}</em></span><span class="package-price">${money(item.price)}</span><span class="package-meta">${item.meta}</span><span class="package-copy">${item.copy}</span><span class="includes"><span class="included-label">Included in package</span><ul class="included-list">${item.includes.map(include => `<li>${include}</li>`).join('')}</ul></span></button>`).join('');
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
  $('#stageLabel').textContent = `${packageItem.name} package · ${packageItem.meta}`;
  $('#backdropLayer').className = `backdrop ${packageItem.shape}`;
  $('#secondaryPanel').classList.toggle('hidden', packageItem.shape !== 'double');
  $('#balloonLayer').className = `balloons size-${state.balloons}`;
  $('#balloonLayer').classList.toggle('hidden', state.balloons === 'none' && !packageItem.includes.some(item => item.toLowerCase().includes('balloon')));
  $('#flowerLayer').className = `flowers size-${state.flowers}`;
  $('#flowerLayer').classList.toggle('hidden', state.flowers === 'none' && !packageItem.includes.some(item => item.toLowerCase().includes('floral')) && !packageItem.includes.some(item => item.toLowerCase().includes('shrub')));
  $('#pedestalLayer').classList.toggle('hidden', !state.props.has('pedestal') && !packageItem.includes.some(item => item.toLowerCase().includes('cake')));
  $('#marqueeLayer').classList.toggle('hidden', !state.props.has('marquee') && !packageItem.includes.some(item => item.toLowerCase().includes('marquee')));
  const hasStands = state.lighting.has('stands');
  $('#lightLeft').classList.toggle('hidden', !hasStands); $('#lightRight').classList.toggle('hidden', !hasStands);
  const hasSpots = state.lighting.has('spots') || packageItem.includes.some(item => item.toLowerCase().includes('spotlight'));
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
  const packageItem = getItem('packages', state.package);
  const matches = {
    balloonIncludedNote: packageItem.includes.filter(item => /balloon/i.test(item)),
    flowerIncludedNote: packageItem.includes.filter(item => /floral|shrub/i.test(item)),
    propIncludedNote: packageItem.includes.filter(item => /cake|marquee|neon/i.test(item)),
    lightingIncludedNote: packageItem.includes.filter(item => /spotlight/i.test(item))
  };
  const copy = {
    balloonIncludedNote: ['balloon styling', 'Select an add-on below for a fuller look.'],
    flowerIncludedNote: ['flower styling', 'Select an add-on below for a floral accent.'],
    propIncludedNote: ['props', 'Select an add-on below for anything extra.'],
    lightingIncludedNote: ['lighting', 'Select an add-on below for more atmosphere.']
  };
  Object.entries(matches).forEach(([id, included]) => {
    const note = $('#'+id);
    if (!note) return;
    note.textContent = included.length ? `Included in ${packageItem.name}: ${included.join(', ')}. ${copy[id][1]}` : `No ${copy[id][0]} is included in ${packageItem.name}. ${copy[id][1]}`;
  });
}
function updateSummary() {
  const packageItem = getItem('packages', state.package);
  const lines = [[packageItem.name, packageItem.price]];
  if (state.balloons !== 'none') lines.push([getItem('balloons', state.balloons).name, getItem('balloons', state.balloons).price]);
  if (state.flowers !== 'none') lines.push([getItem('flowers', state.flowers).name, getItem('flowers', state.flowers).price]);
  for (const id of state.props) lines.push([getItem('props', id).name, getItem('props', id).price]);
  for (const id of state.lighting) lines.push([getItem('lighting', id).name, getItem('lighting', id).price]);
  $('#summaryLines').innerHTML = lines.map(([name, price]) => `<div class="summary-row"><span>${name}</span><strong>${money(price)}</strong></div>`).join('');
  $('#totalPrice').textContent = total().toLocaleString('en-MY');
  const mobileTotal = $('#mobileTotalPrice');
  if (mobileTotal) mobileTotal.textContent = total().toLocaleString('en-MY');
  const topTotal = $('#topTotal');
  if (topTotal) topTotal.textContent = total().toLocaleString('en-MY');
}
function render() {
  renderPackages(); renderSingleOptions('#balloonOptions', data.balloons, 'balloons'); renderSingleOptions('#flowerOptions', data.flowers, 'flowers'); renderChecks('#propOptions', data.props, 'props'); renderChecks('#lightingOptions', data.lighting, 'lighting'); updateIncludedNotes(); updatePreview(); updateSummary();
}
function showStep(step) {
  state.step = Math.max(1, Math.min(6, step));
  $$('.step-tab').forEach(tab => tab.classList.toggle('active', Number(tab.dataset.step) === state.step));
  $$('.step-panel').forEach(panel => panel.classList.toggle('active', Number(panel.dataset.panel) === state.step));
  $('#stepCount').textContent = `${state.step} / 6`; $('#prevBtn').disabled = state.step === 1;
  $('#nextBtn').textContent = state.step === 6 ? 'Review enquiry' : `Next: ${['', 'Balloons', 'Flowers', 'Props', 'Lighting', 'Details'][state.step]}`;
}
function validateDetails() {
  const missing = [];
  if (!$('#nameInput').value.trim()) missing.push('your name');
  if (!$('#dateInput').value) missing.push('the event date');
  if (!$('#venueInput').value.trim()) missing.push('the venue or area');
  $('#formError').textContent = missing.length ? `Please add ${missing.join(', ')} before sending your enquiry.` : '';
  ['nameInput','dateInput','venueInput'].forEach(id => { const field = $('#'+id); field.classList.toggle('invalid', !field.value.trim()); });
  return !missing.length;
}
function enquiryText() {
  const selected = [`${getItem('packages', state.package).name} package — ${money(getItem('packages', state.package).price)}`];
  if (state.balloons !== 'none') selected.push(`${getItem('balloons', state.balloons).name} — ${money(getItem('balloons', state.balloons).price)}`);
  if (state.flowers !== 'none') selected.push(`${getItem('flowers', state.flowers).name} — ${money(getItem('flowers', state.flowers).price)}`);
  for (const id of state.props) selected.push(`${getItem('props', id).name} — ${money(getItem('props', id).price)}`);
  for (const id of state.lighting) selected.push(`${getItem('lighting', id).name} — ${money(getItem('lighting', id).price)}`);
  return `Hi YL Events, I would like to check availability for this backdrop setup.\n\nEvent: ${$('#eventType').value}\nDate: ${formatDate($('#dateInput').value)}\nVenue / area: ${$('#venueInput').value.trim() || 'TBC'}\nName: ${$('#nameInput').value.trim() || 'TBC'}\nAge / number: ${$('#ageInput').value.trim() || '-'}\nMessage: ${$('#messageInput').value.trim() || '-'}\nColour direction: ${state.theme}\nName style: ${nameFonts[state.nameFont].label}, ${state.nameSize}% size\n\nSelected items:\n- ${selected.join('\n- ')}\n\nEstimated starting price: ${money(total())}\n\nPlease confirm availability, transport and final artwork. Thank you.`;
}
function openModal() {
  if (!validateDetails()) { showStep(6); return; }
  $('#enquiryText').value = enquiryText(); $('#whatsappBtn').href = `https://wa.me/60123476878?text=${encodeURIComponent($('#enquiryText').value)}`;
  $('#modal').classList.remove('hidden'); $('#modal').setAttribute('aria-hidden', 'false'); $('#closeModal').focus();
}
function closeModal() { $('#modal').classList.add('hidden'); $('#modal').setAttribute('aria-hidden', 'true'); $('#enquiryBtn').focus(); }
function copyText(text, target) { navigator.clipboard.writeText(text).then(() => { $(target).textContent = 'Copied to clipboard.'; window.setTimeout(() => $(target).textContent = '', 1800); }).catch(() => { $(target).textContent = 'Copy is blocked by this browser.'; }); }

document.addEventListener('click', event => {
  const option = event.target.closest('[data-key]'); if (option) { state[option.dataset.key] = option.dataset.id; render(); return; }
  const check = event.target.closest('[data-check]'); if (check) { const set = state[check.dataset.check]; set.has(check.dataset.id) ? set.delete(check.dataset.id) : set.add(check.dataset.id); render(); return; }
  const theme = event.target.closest('.theme-dot'); if (theme) { state.theme = theme.dataset.theme; $$('.theme-dot').forEach(dot => dot.classList.toggle('active', dot === theme)); updatePreview(); return; }
  const tab = event.target.closest('.step-tab'); if (tab) showStep(Number(tab.dataset.step));
});
['nameInput','ageInput','messageInput'].forEach(id => $('#'+id).addEventListener('input', updatePreview));
$('#nameFont').addEventListener('change', event => { state.nameFont = event.target.value; updatePreview(); });
$('#nameSize').addEventListener('input', event => { state.nameSize = Number(event.target.value); $('#nameSizeValue').textContent = `${state.nameSize}%`; updatePreview(); });
['nameInput','dateInput','venueInput'].forEach(id => $('#'+id).addEventListener('input', () => $('#'+id).classList.remove('invalid')));
$('#nextBtn').addEventListener('click', () => state.step === 6 ? openModal() : showStep(state.step + 1)); $('#prevBtn').addEventListener('click', () => showStep(state.step - 1)); $('#enquiryBtn').addEventListener('click', openModal); $('#mobileEnquiryBtn').addEventListener('click', openModal);
$('#resetBtn').addEventListener('click', () => { state.step = 1; state.package = 'essential'; state.balloons = 'none'; state.flowers = 'none'; state.props.clear(); state.lighting.clear(); state.theme = 'navy'; state.nameFont = 'classic'; state.nameSize = 100; $('#nameInput').value = ''; $('#dateInput').value = ''; $('#venueInput').value = ''; $('#messageInput').value = 'Happy Birthday'; $('#ageInput').value = '7'; $('#nameFont').value = 'classic'; $('#nameSize').value = '100'; $('#nameSizeValue').textContent = '100%'; $$('.theme-dot').forEach(dot => dot.classList.toggle('active', dot.dataset.theme === 'navy')); $('#formError').textContent = ''; showStep(1); render(); });
$('#copyBtn').addEventListener('click', () => copyText(enquiryText(), '#copyNotice')); $('#modalCopyBtn').addEventListener('click', () => copyText($('#enquiryText').value, '#copyNotice')); $('#closeModal').addEventListener('click', closeModal);
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#modal').classList.contains('hidden')) closeModal(); });
const today = new Date(); const todayString = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10); $('#dateInput').min = todayString;
window.addEventListener('resize', fitPreviewName);
render(); showStep(1);
