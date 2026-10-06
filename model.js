(function (root) {
  'use strict';
  const sizes = {small: {name: 'Small', price: 800}, medium: {name: 'Medium', price: 2000}, large: {name: 'Large', price: 3000}};
  const categories = [
    {id:'base', name:'Scrub base', title:'Select your scrub base.', description:'The foundation of your blend.', options:[['Fine sea salt','A classic salt texture.'],['Pink Himalayan salt','A rosy touch.'],['Epsom salt','A salt-based alternative.'],['Fine sugar','A sugar-based texture.']]},
    {id:'oil', name:'Base oil', title:'Select your base oil.', description:'One oil, included in your jar price.', options:[['Fractionated coconut oil','Light and silky.'],['Sweet almond oil','A classic botanical oil.'],['Jojoba oil','A silky botanical choice.'],['Argan oil','A botanical oil.']]},
    {id:'scent', name:'Scent', title:'Follow your senses.', description:'Choose your favourite from our eight signature scent options.', options:[['Lavender','Herbal and floral.'],['Pink grapefruit','Bright and citrusy.'],['Coconut','Soft and tropical.'],['Ylang ylang','Rich and floral.'],['Vanilla','Warm and sweet.'],['Orange','Fresh and citrusy.'],['Oud','Deep and woody.'],['Amber','Warm and mellow.']]},
    {id:'booster', name:'Skin booster', title:'Select your skin booster.', description:'Choose one skin booster, included in the price—or keep your blend simple.', options:[['Vitamin E','A classic finishing ingredient.'],['Squalane','A silky addition.'],['Rosehip oil','A botanical touch.'],['Avocado oil','An extra oil option.'],['No skin booster','Keep it simple.']]},
    {id:'botanical', name:'Botanicals', title:'Finish with botanicals.', description:'One choice is included. Add a second, different botanical for £2—or enjoy your scrub without botanicals.', options:[['Rose petals','A floral flourish.'],['Lavender flowers','A delicate botanical detail.'],['Calendula petals','A golden touch.'],['Chamomile','A soft floral detail.'],['Finely ground oats','A simple botanical addition.'],['Cosmetic shimmer','A subtle shimmer.'],['No botanicals','Simply your blend.']]}
  ];
  function validChoice(id, value) { return categories.find(c=>c.id===id)?.options.some(o=>o[0]===value) || false; }
  function isComplete(item) {
    return !!item && Object.hasOwn(sizes,item.size) && categories.every(c=>validChoice(c.id,item[c.id])) &&
      (!item.extra || (item.botanical !== 'No botanicals' && validChoice('botanical',item.extra) && item.extra !== 'No botanicals' && item.extra !== item.botanical));
  }
  function unitPrice(item) { return Object.hasOwn(sizes,item.size) ? sizes[item.size].price + (item.extra ? 200 : 0) : 0; }
  function money(pence) { return new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:2,minimumFractionDigits:0}).format(pence/100); }
  function cleanCart(value) {
    if (!Array.isArray(value)) return [];
    return value.slice(0,100).filter(isComplete).map((item,index)=>({id:String(index),size:item.size,...Object.fromEntries(categories.map(c=>[c.id,item[c.id]])),extra:item.extra || '',quantity:Number.isInteger(item.quantity) ? Math.max(1,Math.min(99,item.quantity)) : 1}));
  }
  function total(cart) { return cart.reduce((sum,item)=>sum+unitPrice(item)*item.quantity,0); }
  const api = {sizes,categories,validChoice,isComplete,unitPrice,money,cleanCart,total};
  if (typeof module !== 'undefined' && module.exports) module.exports=api;
  else root.SaltRitual=api;
})(typeof globalThis!=='undefined'?globalThis:this);
