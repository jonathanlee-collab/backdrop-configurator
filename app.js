const data = {
  backdrops: [
    {id:'rectangle', name:'Mini Rectangle', price:499, meta:'4ft × 6ft'},
    {id:'arch', name:'Classic Arch', price:649, meta:'4ft × 7ft'},
    {id:'wave', name:'Organic Wave', price:679, meta:'4ft × 7ft'},
    {id:'double', name:'Double Panel', price:999, meta:'4×8 + 3×6ft'}
  ],
  balloons: [
    {id:'none', name:'No Balloons', price:0, meta:'Keep it minimal'},
    {id:'small', name:'Small Garland', price:180, meta:'4–5 ft'},
    {id:'medium', name:'Medium Garland', price:280, meta:'7–8 ft'},
    {id:'large', name:'Large Garland', price:380, meta:'10–12 ft'}
  ],
  flowers: [
    {id:'none', name:'No Flowers', price:0, meta:'Backdrop only'},
    {id:'small', name:'Small Shrub', price:90, meta:'Accent piece'},
    {id:'medium', name:'Medium Shrub', price:160, meta:'Fuller arrangement'},
    {id:'large', name:'Large Shrub', price:260, meta:'Feature floral'}
  ],
  props: [
    {id:'pedestal', name:'Silver Cake Pedestal', price:90},
    {id:'marquee', name:'3ft Marquee Number', price:150},
    {id:'neon', name:'Happy Birthday Neon', price:100, visual:false},
    {id:'cutout', name:'Custom Cutout', price:180, visual:false}
  ],
  lighting: [
    {id:'stands', name:'Ball Light Stands ×2', price:160},
    {id:'spots', name:'Floor Spotlights ×2', price:80},
    {id:'uplight', name:'LED Uplights ×2', price:100, visual:false}
  ]
};

const state = {step:1, backdrop:'rectangle', balloons:'none', flowers:'none', props:new Set(), lighting:new Set(), theme:'sage'};
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => `RM ${n.toLocaleString('en-MY')}`;

function renderSingleOptions(containerId, items, key){
  const el = $(containerId);
  el.innerHTML = items.map(x => `<div class="option-card ${state[key]===x.id?'selected':''}" data-key="${key}" data-id="${x.id}"><div class="option-name">${x.name}</div><div class="option-meta"><span>${x.meta}</span><span class="option-price">${x.price?`+${money(x.price)}`:'Included'}</span></div></div>`).join('');
}
function renderChecks(containerId, items, key){
  const el = $(containerId);
  el.innerHTML = items.map(x => `<div class="check-card ${state[key].has(x.id)?'selected':''}" data-check="${key}" data-id="${x.id}"><div class="option-name">${x.name}</div><div class="option-meta"><span>${state[key].has(x.id)?'Added':'Tap to add'}</span><span class="option-price">+${money(x.price)}</span></div></div>`).join('');
}
function getItem(group,id){ return data[group].find(x=>x.id===id); }
function total(){
  let t=getItem('backdrops',state.backdrop).price+getItem('balloons',state.balloons).price+getItem('flowers',state.flowers).price;
  for(const id of state.props)t+=getItem('props',id).price;
  for(const id of state.lighting)t+=getItem('lighting',id).price;
  return t;
}
function updatePreview(){
  const backdrop=$('#backdropLayer');
  backdrop.className=`backdrop ${state.backdrop}`;
  $('#secondaryPanel').classList.toggle('hidden',state.backdrop!=='double');
  const balloons=$('#balloonLayer'); balloons.className=`balloons size-${state.balloons}`; balloons.classList.toggle('hidden',state.balloons==='none');
  const flowers=$('#flowerLayer'); flowers.className=`flowers size-${state.flowers}`; flowers.classList.toggle('hidden',state.flowers==='none');
  $('#pedestalLayer').classList.toggle('hidden',!state.props.has('pedestal'));
  $('#marqueeLayer').classList.toggle('hidden',!state.props.has('marquee'));
  $('#lightLeft').classList.toggle('hidden',!state.lighting.has('stands')); $('#lightRight').classList.toggle('hidden',!state.lighting.has('stands'));
  $('#spotLeft').classList.toggle('hidden',!state.lighting.has('spots')); $('#spotRight').classList.toggle('hidden',!state.lighting.has('spots'));
  $('#stage').className=`stage theme-${state.theme}`;
  $('#previewName').textContent=$('#nameInput').value.trim()||'NAME';
  $('#previewAge').textContent=$('#ageInput').value.trim();
  $('#marqueeLayer').textContent=$('#ageInput').value.trim()||'7';
  $('#previewMessage').textContent=$('#messageInput').value.trim()||'Happy Birthday';
}
function updateSummary(){
  const lines=[
    [getItem('backdrops',state.backdrop).name,getItem('backdrops',state.backdrop).price],
    ...(state.balloons!=='none'?[[getItem('balloons',state.balloons).name,getItem('balloons',state.balloons).price]]:[]),
    ...(state.flowers!=='none'?[[getItem('flowers',state.flowers).name,getItem('flowers',state.flowers).price]]:[]),
    ...[...state.props].map(id=>[getItem('props',id).name,getItem('props',id).price]),
    ...[...state.lighting].map(id=>[getItem('lighting',id).name,getItem('lighting',id).price])
  ];
  $('#summaryLines').innerHTML=lines.map(([n,p])=>`<div class="summary-row"><span>${n}</span><span>${money(p)}</span></div>`).join('');
  $('#totalPrice').textContent=total().toLocaleString('en-MY'); $('#topTotal').textContent=total().toLocaleString('en-MY');
}
function rerender(){renderSingleOptions('#backdropOptions',data.backdrops,'backdrop');renderSingleOptions('#balloonOptions',data.balloons,'balloons');renderSingleOptions('#flowerOptions',data.flowers,'flowers');renderChecks('#propOptions',data.props,'props');renderChecks('#lightingOptions',data.lighting,'lighting');updatePreview();updateSummary();}
function showStep(n){state.step=Math.max(1,Math.min(6,n));$$('.step-tab').forEach(x=>x.classList.toggle('active',+x.dataset.step===state.step));$$('.step-panel').forEach(x=>x.classList.toggle('active',+x.dataset.panel===state.step));$('#prevBtn').disabled=state.step===1;$('#nextBtn').textContent=state.step===6?'Review enquiry':'Next';}
function enquiryText(){
  const selected=[];selected.push(`${getItem('backdrops',state.backdrop).name} — ${money(getItem('backdrops',state.backdrop).price)}`);if(state.balloons!=='none')selected.push(`${getItem('balloons',state.balloons).name} — ${money(getItem('balloons',state.balloons).price)}`);if(state.flowers!=='none')selected.push(`${getItem('flowers',state.flowers).name} — ${money(getItem('flowers',state.flowers).price)}`);for(const id of state.props)selected.push(`${getItem('props',id).name} — ${money(getItem('props',id).price)}`);for(const id of state.lighting)selected.push(`${getItem('lighting',id).name} — ${money(getItem('lighting',id).price)}`);
  return `Hi, I would like to check availability for this backdrop setup:\n\nEvent: ${$('#eventType').value}\nDate: ${$('#dateInput').value||'TBC'}\nVenue/Area: ${$('#venueInput').value||'TBC'}\nName: ${$('#nameInput').value||'TBC'}\nAge/Number: ${$('#ageInput').value||'-'}\nMessage: ${$('#messageInput').value||'-'}\nTheme: ${state.theme}\n\nSelected items:\n- ${selected.join('\n- ')}\n\nEstimated setup total: ${money(total())}\n\nTransport and venue-related charges to be confirmed separately.`;
}

document.addEventListener('click',e=>{
  const option=e.target.closest('[data-key]'); if(option){state[option.dataset.key]=option.dataset.id;rerender();}
  const check=e.target.closest('[data-check]'); if(check){const set=state[check.dataset.check];set.has(check.dataset.id)?set.delete(check.dataset.id):set.add(check.dataset.id);rerender();}
  const tab=e.target.closest('.step-tab'); if(tab)showStep(+tab.dataset.step);
  const theme=e.target.closest('.theme-dot'); if(theme){state.theme=theme.dataset.theme;$$('.theme-dot').forEach(x=>x.classList.toggle('active',x===theme));updatePreview();}
});
['nameInput','ageInput','messageInput'].forEach(id=>$('#'+id).addEventListener('input',updatePreview));
$('#nextBtn').addEventListener('click',()=>state.step===6?openModal():showStep(state.step+1));$('#prevBtn').addEventListener('click',()=>showStep(state.step-1));
$('#resetBtn').addEventListener('click',()=>{state.backdrop='rectangle';state.balloons='none';state.flowers='none';state.props.clear();state.lighting.clear();state.theme='sage';$('#nameInput').value='AIDAN';$('#ageInput').value='7';$('#messageInput').value='Happy Birthday';$$('.theme-dot').forEach(x=>x.classList.toggle('active',x.dataset.theme==='sage'));showStep(1);rerender();});
function openModal(){const txt=enquiryText();$('#enquiryText').value=txt;$('#whatsappBtn').href=`https://wa.me/?text=${encodeURIComponent(txt)}`;$('#modal').classList.remove('hidden');$('#modal').setAttribute('aria-hidden','false');}
$('#enquiryBtn').addEventListener('click',openModal);$('#closeModal').addEventListener('click',()=>{$('#modal').classList.add('hidden');$('#modal').setAttribute('aria-hidden','true')});
async function copyText(text,notice){try{await navigator.clipboard.writeText(text);$(notice).textContent='Copied.';setTimeout(()=>$(notice).textContent='',1800)}catch{$(notice).textContent='Copy is blocked by this browser.'}}
$('#copyBtn').addEventListener('click',()=>copyText(enquiryText(),'#copyNotice'));$('#modalCopyBtn').addEventListener('click',()=>navigator.clipboard.writeText($('#enquiryText').value));
rerender();showStep(1);
