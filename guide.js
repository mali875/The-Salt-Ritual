 'use strict';
// Cosmetic contributions and sensory preferences, not therapeutic promises.
const ingredientGuide = [
{id:'base',label:'Scrub bases',image:'salt',alt:'Ivory and pink salt crystals in a shallow stone dish',intro:'Choose the texture at the heart of your scrub. Fine grains give a different feel from coarse crystals.',entries:[
['Fine sea salt','EXFOLIATION',['Helps lift away dead skin as you massage','Gives your scrub a fine, crystalline texture'],'Particle size and the finished blend determine the feel.'],
['Pink Himalayan salt','EXFOLIATION / COLOUR',['Helps lift away dead skin as you massage','Adds naturally rosy colour'],'Choose it for salt texture and appearance.'],
['Epsom salt','EXFOLIATION',['Exfoliates through its crystalline texture','Offers an alternative to a sea-salt base'],'Magnesium sulphate crystals offer an alternative scrub base.'],
['Fine sugar','EXFOLIATION',['Helps lift away dead skin as you massage','Dissolves in water as you rinse'],'A sugar-based option. Fineness and formulation determine how it feels.']]},
{id:'oil',label:'Base oils',image:'oils',alt:'Golden botanical oil in a glass dish beside a pipette and almonds',intro:'Your oil gives the scrub glide and helps leave skin feeling softer. Pick the finish you prefer.',entries:[
['Fractionated coconut oil','LIGHT / SILKY',['Adds a fluid, light-feeling glide','Helps soften skin feel'],'The base oil is separate from coconut fragrance.'],
['Sweet almond oil','SOFT / SMOOTH',['Helps soften skin feel','Gives the scrub a smooth glide'],'Derived from almonds; check the final ingredient list if you have allergies.'],
['Jojoba oil','SILKY / SMOOTH',['Adds a silky feel to the blend','Helps soften skin feel'],'A liquid botanical wax used as an emollient.'],
['Argan oil','SMOOTH / CONDITIONING',['Contributes to softer-feeling skin','Adds a smooth botanical oil finish'],'An oil from argan kernels.']]},
{id:'scent',label:'Scents',image:'scent',alt:'Pink grapefruit, orange peel, vanilla and a pale flower on a dark surface',intro:'Choose how you want your scrub to smell. These are fragrance notes and sensory preferences.',entries:[
['Lavender','HERBAL / FLORAL',['Adds a fresh, herbal floral scent','Gives an aromatic fragrance character'],'Choose for fragrance preference.'],
['Pink grapefruit','BRIGHT / CITRUS',['Adds a crisp, zesty scent','Brings a tart citrus edge'],'Choose for a bright fragrance.'],
['Coconut','SOFT / TROPICAL',['Adds a creamy tropical scent','Gives a soft, rounded fragrance character'],'Your scent choice is separate from your base oil.'],
['Ylang ylang','RICH / FLORAL',['Adds a full, expressive floral scent','Brings sweet, heady fragrance notes'],'Choose for a richer floral signature.'],
['Vanilla','WARM / SWEET',['Adds warm, softly sweet notes','Rounds out the fragrance character'],'Choose for a familiar, warm scent.'],
['Orange','FRESH / CITRUS',['Adds a juicy citrus scent','Brings a bright, sweeter citrus character'],'Choose for fresh citrus notes.'],
['Oud','DEEP / WOODY',['Adds a deep, woody scent','Brings rich, resinous fragrance notes'],'Exact notes depend on the fragrance blend.'],
['Amber','WARM / RESINOUS',['Adds warm, rounded fragrance notes','Brings a resinous sense of depth'],'Amber is a fragrance accord, rather than a single botanical oil.']]},
{id:'booster',label:'Skin boosters',image:'oils',alt:'Close detail of a glass pipette and golden oil',intro:'One optional addition to your oil blend is included. Choose the skin feel you prefer, or keep it simple.',entries:[
['Vitamin E','ANTIOXIDANT / CONDITIONING',['Adds an antioxidant ingredient to the oil blend','Contributes to skin conditioning'],'Its formulation role depends on the type and amount used.'],
['Squalane','SILKY / SMOOTH',['Helps soften skin feel','Adds a smooth, silky glide'],'An emollient addition to the oil blend.'],
['Rosehip oil','BOTANICAL / CONDITIONING',['Contributes to softer-feeling skin','Adds another botanical oil to your base'],'An additional botanical oil for your selected base.'],
['Avocado oil','RICH / CONDITIONING',['Helps soften skin feel','Adds a richer oil feel to the blend'],'The finished formula determines the final feel.'],
['No skin booster','KEEP IT SIMPLE',['Keeps your selected base oil on its own','Leaves out an optional extra ingredient'],'The jar price stays the same.']]},
{id:'botanical',label:'Botanicals',image:'petals',alt:'Dried rose petals, lavender, calendula and chamomile flowers',intro:'Add colour, texture and a finishing detail. One choice is included; a second different botanical is £2 per jar.',entries:[
['Rose petals','FLORAL / COLOUR',['Adds burgundy floral accents','Gives your jar a petal finish'],'A decorative addition; your scent is chosen separately.'],
['Lavender flowers','HERBAL / DETAIL',['Adds a herbal botanical detail','Gives the blend visible flower accents'],'Choose lavender fragrance separately if that is your preferred scent.'],
['Calendula petals','GOLDEN / COLOUR',['Adds golden-yellow accents','Gives your blend a floral finish'],'Chosen here for appearance and botanical detail.'],
['Chamomile','DELICATE / FLORAL',['Adds small floral details','Gives the jar a delicate botanical finish'],'Chosen for its delicate floral appearance.'],
['Finely ground oats','TEXTURE / DETAIL',['Adds a finely ground botanical texture','Gives the blend an understated finish'],'Finely ground oats are not necessarily colloidal oatmeal.'],
['Cosmetic shimmer','LUMINOUS / FINISH',['Adds subtle decorative shimmer','Gives the blend a luminous appearance'],'A cosmetic finishing option rather than a botanical extract.'],
['No botanicals','KEEP IT SIMPLE',['Leaves out decorative petals and shimmer','Keeps the finish focused on your base and oils'],'All other choices remain included; the price stays the same.']]}
];
const guideOilArt = {
  'Fractionated coconut oil':'coconut',
  'Sweet almond oil':'almond',
  'Jojoba oil':'jojoba',
  'Argan oil':'argan'
};
function showGuideOil(name) {
  const image=document.getElementById('guide-image');
  image.src=`assets/oil-${guideOilArt[name]}.webp`;
  image.alt=`${name} with its botanical ingredients on a dark surface`;
  document.getElementById('guide-stage-label').textContent=name;
}
const guideTabs=document.getElementById('guide-tabs');
const guidePanel=document.getElementById('guide-panel');
function renderGuide(index,moveFocus=false) {
  const group=ingredientGuide[index];
  const image=document.getElementById('guide-image');image.src=`assets/ingredient-${group.image}.webp`;image.alt=group.alt;
  document.getElementById('ingredients').dataset.stage=group.id;
  document.getElementById('guide-stage-label').textContent=group.label;
  for(const [i,button] of [...guideTabs.children].entries()) {button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;}
  guidePanel.setAttribute('aria-labelledby',`guide-tab-${group.id}`);guidePanel.replaceChildren();
  const intro=document.createElement('p');intro.className='guide-panel-intro';intro.textContent=group.intro;guidePanel.append(intro);
  const grid=document.createElement('div');grid.className='guide-grid';
  group.entries.forEach(([name,role,benefits,note],entryIndex)=>{
    const article=document.createElement('details');article.className='guide-card';article.open=entryIndex===0;
    if(group.id==='oil') {
      article.dataset.oil=guideOilArt[name];
      article.addEventListener('toggle',()=>{
        if(!article.open)return;
        for(const sibling of grid.children)if(sibling!==article)sibling.open=false;
        showGuideOil(name);
      });
    }
    const summary=document.createElement('summary');
    const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=role;
    const title=document.createElement('span');title.className='ingredient-name';title.textContent=name;
    const body=document.createElement('ul');body.className='ingredient-benefits';
    benefits.forEach(benefit=>{const item=document.createElement('li');item.textContent=benefit;body.append(item);});
    const choose=document.createElement('p');choose.className='ingredient-note';choose.textContent=note;
    summary.append(title,eyebrow);article.append(summary,body,choose);grid.append(article);
  });
  guidePanel.append(grid);
  if(group.id==='oil')showGuideOil(group.entries[0][0]);
  if(moveFocus)guideTabs.children[index].focus();
}
ingredientGuide.forEach((group,index)=>{
  const button=document.createElement('button');button.type='button';button.id=`guide-tab-${group.id}`;button.textContent=group.label;
  button.setAttribute('role','tab');button.setAttribute('aria-controls','guide-panel');
  button.addEventListener('click',()=>renderGuide(index));
  button.addEventListener('keydown',event=>{
    let next=index;
    if(event.key==='ArrowRight')next=(index+1)%ingredientGuide.length;
    else if(event.key==='ArrowLeft')next=(index-1+ingredientGuide.length)%ingredientGuide.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=ingredientGuide.length-1;
    else return;
    event.preventDefault();renderGuide(next,true);
  });guideTabs.append(button);
});
renderGuide(0);
