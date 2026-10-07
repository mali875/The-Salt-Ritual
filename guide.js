'use strict';
const ingredientGuide = [
  {id:'base', label:'Scrub bases', intro:'Your base supplies the exfoliating crystals. The feel depends on the particle size and the finished blend—not simply whether it is salt or sugar.', entries:[
    ['Fine sea salt','PHYSICAL EXFOLIATION','Salt crystals provide the scrub texture; choosing a fine grade gives a finer grain than coarse salt.','A classic salt-based scrub.'],
    ['Pink Himalayan salt','PHYSICAL EXFOLIATION','A salt-based option with naturally pink-toned crystals. Its main purpose here is scrub texture and appearance.','A salt base with a rosy colour.'],
    ['Epsom salt','PHYSICAL EXFOLIATION','Magnesium sulphate crystals offer an alternative to a sea-salt base. In this scrub menu, their role is the physical texture.','An alternative crystal base.'],
    ['Fine sugar','PHYSICAL EXFOLIATION','Sugar crystals give a sugar-based scrub and dissolve in water. The fineness of the sugar and the formulation determine how the scrub feels.','A sugar base rather than salt.']
  ]},
  {id:'oil', label:'Base oils', intro:'Base oils give the scrub slip and help leave skin feeling softer. These are descriptions of the ingredients; the final feel depends on the complete formula.', entries:[
    ['Fractionated coconut oil','EMOLLIENT / SLIP','A liquid coconut-derived oil commonly used to give cosmetic blends a smooth, light-feeling glide. It is the base oil; coconut fragrance is a separate scent choice.','A fluid, silky oil base.'],
    ['Sweet almond oil','EMOLLIENT / SKIN FEEL','A plant oil used to soften skin feel and give the scrub a smooth glide. It is derived from almonds.','A traditional botanical oil with a soft finish.'],
    ['Jojoba oil','EMOLLIENT / SKIN FEEL','Technically a liquid wax, jojoba is used in cosmetics as an emollient. It brings a silky feel to an oil blend.','A silky, wax-based botanical oil.'],
    ['Argan oil','EMOLLIENT / SKIN FEEL','An oil from argan kernels, used in cosmetic oil blends for skin conditioning and a smooth finish. It is often the oil meant by “Moroccan oil”.','A luxurious botanical oil option.']
  ]},
  {id:'scent', label:'Scents', intro:'Scents give your scrub its fragrance character. Explore floral, citrus, tropical, warm and woody profiles to find your preference. The exact notes depend on the finished fragrance blend.', entries:[
    ['Lavender','HERBAL / FLORAL','A recognisable floral-herbal profile with a fresh, aromatic character.','A herbal floral signature.'],
    ['Pink grapefruit','BRIGHT / CITRUS','A citrus profile with tart, zesty and slightly bitter notes.','A crisp, bright fragrance.'],
    ['Coconut','SOFT / TROPICAL','A rounded, creamy tropical scent profile. Choosing this fragrance does not mean choosing coconut as your base oil.','A soft, tropical fragrance.'],
    ['Ylang ylang','RICH / FLORAL','An expressive floral profile, often described as sweet, heady and slightly exotic.','A full, expressive floral scent.'],
    ['Vanilla','WARM / SWEET','A familiar warm profile with sweet, rounded notes.','A warm, softly sweet fragrance.'],
    ['Orange','FRESH / CITRUS','A juicy citrus profile with a bright, sweet character.','A fresh citrus scent with a sweeter edge.'],
    ['Oud','DEEP / WOODY','A woody fragrance profile with rich, resinous notes. The exact character depends on the fragrance blend.','A deeper, more woody signature.'],
    ['Amber','WARM / RESINOUS','A fragrance accord rather than one specific botanical oil. Amber scents are typically warm, rounded and resinous.','A warm fragrance with depth.']
  ]},
  {id:'booster', label:'Skin boosters', intro:'Choose one additional ingredient to shape your oil blend, included in the jar price. Prefer fewer ingredients? Select no skin booster.', entries:[
    ['Vitamin E','ANTIOXIDANT / SKIN CONDITIONING','An antioxidant ingredient used in cosmetic oil blends, also listed for skin conditioning. Its role is different from that of a fragrance or scrub crystal.','An antioxidant ingredient in your oil blend.'],
    ['Squalane','EMOLLIENT / SKIN FEEL','An emollient used for a smooth, silky skin feel. It is an oil-phase ingredient and does not add exfoliating particles.','A silky addition to the oil blend.'],
    ['Rosehip oil','EMOLLIENT / SKIN FEEL','A plant oil used in cosmetics for skin conditioning. Here it adds another botanical oil to your chosen base.','An additional botanical oil.'],
    ['Avocado oil','EMOLLIENT / SKIN FEEL','A plant oil used in cosmetic blends for skin conditioning and an oil-rich feel.','A richer-feeling oil addition.'],
    ['No skin booster','A SIMPLER BLEND','Keep the oil blend to your selected base oil without adding a separate booster. The jar price stays the same.','Fewer optional ingredients.']
  ]},
  {id:'botanical', label:'Botanicals', intro:'Botanicals and shimmer add finishing details for appearance and texture. One is included; a second different choice costs £2 per jar. Your fragrance is chosen separately in the scent category.', entries:[
    ['Rose petals','APPEARANCE / BOTANICAL DETAIL','Dried petals add a floral visual detail. Their appearance is separate from the rose fragrance profile.','A romantic floral finish.'],
    ['Lavender flowers','APPEARANCE / BOTANICAL DETAIL','Dried flowers add a herbal botanical detail to the blend. Choose lavender scent separately if that is your fragrance preference.','A herbal botanical finish.'],
    ['Calendula petals','APPEARANCE / BOTANICAL DETAIL','Petals introduce yellow and golden botanical accents for a floral finishing detail.','A golden floral detail.'],
    ['Chamomile','APPEARANCE / BOTANICAL DETAIL','A dried floral addition that brings botanical character to the scrub.','A delicate floral finish.'],
    ['Finely ground oats','TEXTURE / BOTANICAL DETAIL','A finely ground botanical addition that adds texture and botanical character alongside your main scrub base.','An understated botanical addition.'],
    ['Cosmetic shimmer','APPEARANCE / SHIMMER','A cosmetic-grade decorative option for a subtle shimmer. It sits in this finishing category and is not a botanical extract.','A subtly luminous finish.'],
    ['No botanicals','A SIMPLE FINISH','Leave out the decorative botanicals and shimmer. All your other ingredient choices stay the same, with no price reduction.','A simpler blend without decorative extras.']
  ]}
];
const guideTabs=document.getElementById('guide-tabs');
const guidePanel=document.getElementById('guide-panel');
function renderGuide(index,moveFocus=false) {
  const group=ingredientGuide[index];
  for(const [i,button] of [...guideTabs.children].entries()) {button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;}
  guidePanel.setAttribute('aria-labelledby',`guide-tab-${group.id}`);guidePanel.replaceChildren();
  const intro=document.createElement('p');intro.className='guide-panel-intro';intro.textContent=group.intro;guidePanel.append(intro);
  const grid=document.createElement('div');grid.className='guide-grid';
  group.entries.forEach(([name,role,description,choice],entryIndex)=>{
    const article=document.createElement('details');article.className='guide-card';article.open=entryIndex===0;
    const summary=document.createElement('summary');
    const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=role;
    const title=document.createElement('span');title.className='ingredient-name';title.textContent=name;
    const body=document.createElement('p');body.textContent=description;
    const choose=document.createElement('p');choose.className='choose-for';const label=document.createElement('strong');label.textContent='CHOOSE FOR';const text=document.createElement('span');text.textContent=choice;choose.append(label,text);
    summary.append(title,eyebrow);article.append(summary,body,choose);grid.append(article);
  });
  guidePanel.append(grid);
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
