'use strict';
const M = window.SaltRitual;
const $ = id => document.getElementById(id);
const storageKey='the-salt-ritual-basket-v1';
let cart=[];
try {cart=M.cleanCart(JSON.parse(localStorage.getItem(storageKey)||'[]'));} catch {}
let draft={},step=0,extraEnabled=false,editingId=null;
const scrollBehavior=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
function el(tag,text,className) {const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;}
function saveCart() {
  try {localStorage.setItem(storageKey,JSON.stringify(cart));$('basket-status').textContent='';}
  catch {$('basket-status').textContent='Browser storage is unavailable. Download your choices to keep a copy.';}
  $('basket-count').textContent=cart.reduce((sum,item)=>sum+item.quantity,0);
}
function details(item,includeUnchosen=false) {
  const list=el('dl');
  const rows=[['Size',M.sizes[item.size]?.name || 'Choose a size'],...M.categories.map(c=>[c.name,item[c.id] || (includeUnchosen?'Choose next':'')])];
  if(item.extra)rows.push(['Extra botanical',`${item.extra} (+£2)`]);
  for(const [label,value] of rows) {const row=el('div');row.append(el('dt',label),el('dd',value));list.append(row);}
  return list;
}
function updateSummary() {
  $('blend-summary').replaceChildren(...details(draft,true).children);
  $('blend-total').textContent=M.money(M.unitPrice(draft));
}
function renderProgress() {
  $('progress').replaceChildren();
  ['Size',...M.categories.map(c=>c.name),'Review'].forEach((name,index)=> {
    const li=el('li',name,index===step+1?'active':index<step+1?'complete':'');
    if(index===step+1)li.setAttribute('aria-current','step');
    $('progress').append(li);
  });
}
function choiceCard(value,description,name,checked,onChange) {
  const label=el('label',undefined,'choice');const input=el('input');input.type='radio';input.name=name;input.value=value;input.checked=checked;
  const content=el('span',undefined,'choice-content');content.append(el('strong',value),el('small',description));
  input.addEventListener('change',onChange);label.append(input,content);return label;
}
function renderExtra() {
  const options=$('extra-options');options.replaceChildren();
  const noBotanicals=draft.botanical==='No botanicals';
  if(noBotanicals || !draft.botanical) {extraEnabled=false;draft.extra='';}
  $('extra-toggle').disabled=noBotanicals || !draft.botanical;
  $('extra-toggle').checked=extraEnabled;options.hidden=!extraEnabled;
  if(extraEnabled) {
    M.categories[4].options.filter(([value])=>value!=='No botanicals' && value!==draft.botanical).forEach(([value,description])=>{
      options.append(choiceCard(value,description,'extra',draft.extra===value,()=>{draft.extra=value;updateSummary();updateNext();}));
    });
  }
}
function stepReady() {return step===M.categories.length ? M.isComplete(draft) : M.validChoice(M.categories[step].id,draft[M.categories[step].id]) && (step!==4 || !extraEnabled || !!draft.extra);}
function updateNext() {$('next').disabled=!stepReady();}
function renderStep(focus=true) {
  const isReview=step===M.categories.length;
  $('builder').dataset.stage=isReview?'review':M.categories[step].id;
  $('choices-form').hidden=isReview;$('review').hidden=!isReview;$('extra-botanical').hidden=step!==4;
  $('step-number').textContent=`STEP ${step+2} OF 7`;
  $('step-title').textContent=isReview?'Your blend, composed.':M.categories[step].title;
  $('step-description').textContent=isReview?'Your selections, brought together. Check your blend before adding it to your basket.':M.categories[step].description;
  $('next').textContent=isReview?(editingId?'Save changes ↗':'Add to basket ↗'):'Continue →';
  $('builder-status').textContent='';$('choices').replaceChildren();
  if(isReview) {
    $('review').replaceChildren(details(draft));
    $('review').append(el('p',`${M.money(M.unitPrice(draft))} per jar · online payments coming soon`,'review-price'));
  } else {
    const category=M.categories[step];$('choices-legend').textContent=category.name;
    category.options.forEach(([value,description])=>{
      $('choices').append(choiceCard(value,description,category.id,draft[category.id]===value,()=>{
        draft[category.id]=value;
        if(category.id==='botanical') {if(draft.extra===value)draft.extra='';renderExtra();}
        updateSummary();updateNext();
      }));
    });
    if(step===4)renderExtra();
  }
  renderProgress();updateSummary();updateNext();
  if(focus)$('step-title').focus({preventScroll:true});
}
function openBuilder(size) {
  draft={size,extra:''};step=0;extraEnabled=false;editingId=null;
  $('builder').hidden=false;renderStep();$('builder').scrollIntoView({behavior:scrollBehavior()});
}
document.querySelectorAll('[data-size]').forEach(button=>button.addEventListener('click',()=>openBuilder(button.dataset.size)));
$('change-size').addEventListener('click',()=>{$('sizes').scrollIntoView({behavior:scrollBehavior()});document.querySelector(`[data-size="${draft.size}"]`).focus({preventScroll:true});});
$('choices-form').addEventListener('submit',event=>event.preventDefault());
$('extra-toggle').addEventListener('change',event=>{extraEnabled=event.target.checked;if(!extraEnabled)draft.extra='';renderExtra();updateSummary();updateNext();});
$('previous').addEventListener('click',()=>{if(step===0){$('change-size').click();return;}step--;renderStep();});
$('next').addEventListener('click',()=>{
  if(!stepReady())return;
  if(step<M.categories.length){step++;renderStep();return;}
  const edited=cart.find(item=>item.id===editingId);
  if(edited) Object.assign(edited,draft);
  else {
    const same=cart.find(item=>item.size===draft.size && item.extra===draft.extra && M.categories.every(c=>item[c.id]===draft[c.id]));
    if(same && same.quantity<99)same.quantity++;
    else cart.push({...draft,id:String(Date.now())+'-'+String(Math.random()).slice(2),quantity:1});
  }
  editingId=null;saveCart();$('builder-status').textContent=edited?'Your blend has been updated.':'Your blend has been added to your basket.';renderBasket();openBasket();
});
function renderBasket() {
  const container=$('basket-items');container.replaceChildren();
  if(!cart.length)container.append(el('p','Your basket is empty. Select a size to compose your first blend.','empty-basket'));
  cart.forEach(item=>{
    const article=el('article',undefined,'basket-item');const heading=el('div',undefined,'basket-item-heading');
    heading.append(el('h3',`${M.sizes[item.size].name} salt ritual`),el('strong',M.money(M.unitPrice(item)*item.quantity)));
    article.append(heading,details(item));
    const controls=el('div',undefined,'quantity-row');const label=el('label','Quantity ');const input=el('input');
    input.type='number';input.min='1';input.max='99';input.value=item.quantity;input.setAttribute('aria-label',`Quantity of ${M.sizes[item.size].name.toLowerCase()} salt ritual`);
    input.addEventListener('change',()=>{const value=Number(input.value);item.quantity=Number.isInteger(value)?Math.max(1,Math.min(99,value)):1;saveCart();renderBasket();});label.append(input);
    const edit=el('button','Edit blend','text-button');edit.type='button';edit.addEventListener('click',()=>{editingId=item.id;draft={...item};delete draft.id;delete draft.quantity;step=0;extraEnabled=!!draft.extra;$('builder').hidden=false;closeBasket();renderStep();$('builder').scrollIntoView({behavior:scrollBehavior()});});
    const remove=el('button','Remove','text-button');remove.type='button';remove.setAttribute('aria-label',`Remove ${M.sizes[item.size].name.toLowerCase()} salt ritual`);remove.addEventListener('click',()=>{cart=cart.filter(row=>row.id!==item.id);saveCart();renderBasket();$('basket-heading').tabIndex=-1;$('basket-heading').focus();});
    controls.append(label,edit,remove);article.append(controls);container.append(article);
  });
  $('basket-totals').replaceChildren();
  if(cart.length){const row=el('div');row.append(el('span','Subtotal'),el('strong',M.money(M.total(cart))));$('basket-totals').append(row,el('p','Delivery options and costs will be confirmed when ordering opens.'));}
  $('download-basket').hidden=!cart.length;
}
function openBasket(){renderBasket();$('basket-dialog').showModal();}
function closeBasket(){$('basket-dialog').close();}
$('open-basket').addEventListener('click',openBasket);$('close-basket').addEventListener('click',closeBasket);
$('continue-shopping').addEventListener('click',()=>{closeBasket();$('sizes').scrollIntoView({behavior:scrollBehavior()});});
$('basket-dialog').addEventListener('click',event=>{if(event.target===$('basket-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeBasket();}});
$('download-basket').addEventListener('click',()=>{
  const lines=['THE SALT RITUAL','Your saved blend choices',''];
  cart.forEach((item,index)=>{lines.push(`${index+1}. ${M.sizes[item.size].name} — ${M.money(M.unitPrice(item))} each × ${item.quantity}`, ...M.categories.map(c=>`${c.name}: ${item[c.id]}`));if(item.extra)lines.push(`Extra botanical: ${item.extra} (+£2 per jar)`);lines.push('');});
  lines.push(`Subtotal: ${M.money(M.total(cart))}`,'Delivery costs not yet confirmed.','This is a saved basket, not a placed order. Payments are coming soon.');
  const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}));const link=el('a');link.href=url;link.download='my-salt-ritual-blends.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
  $('basket-status').textContent='Your blend choices are ready. Check your downloads.';
});
saveCart();renderBasket();
