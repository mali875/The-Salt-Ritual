const assert=require('node:assert/strict');
const M=require('../model.js');
const make=(size,extra='')=>({size,base:'Fine sea salt',oil:'Jojoba oil',scent:'Lavender',booster:'Vitamin E',botanical:'Rose petals',extra,quantity:1});
for(const [size,base] of [['small',800],['medium',2000],['large',3000]]) {
  assert.equal(M.unitPrice(make(size)),base);
  assert.equal(M.unitPrice(make(size,'Chamomile')),base+200);
}
assert.equal(M.total([{...make('small','Chamomile'),quantity:3},make('large')]),6000);
assert.equal(M.isComplete(make('small')),true);
assert.equal(M.isComplete({...make('small'),botanical:'No botanicals'}),true);
assert.equal(M.isComplete({...make('small'),booster:'No skin booster'}),true);
assert.equal(M.isComplete(make('small','Rose petals')),false);
assert.equal(M.isComplete(make('small','No botanicals')),false);
assert.equal(M.isComplete({...make('small','Chamomile'),botanical:'No botanicals'}),false);
assert.equal(M.isComplete({...make('small'),size:'unknown'}),false);
assert.equal(M.isComplete({...make('small'),base:'Brown sugar'}),false);
assert.equal(M.isComplete({...make('small'),scent:'Peppermint'}),false);
assert.equal(M.isComplete({...make('small'),oil:''}),false);
for(const scent of ['Lavender','Pink grapefruit','Coconut','Ylang ylang','Vanilla','Orange','Oud','Amber'])assert.equal(M.isComplete({...make('small'),scent}),true);
assert.deepEqual(M.cleanCart(null),[]);
assert.deepEqual(M.cleanCart([null,{},make('unknown')]),[]);
const loaded=M.cleanCart([{...make('large','Chamomile'),quantity:999,price:1,unexpected:'ignored'}, {...make('small'),quantity:-2}]);
assert.equal(loaded[0].quantity,99);assert.equal(loaded[1].quantity,1);
assert.equal(Object.hasOwn(loaded[0],'price'),false);
assert.equal(M.unitPrice(loaded[0]),3200);
assert.equal(M.cleanCart([{...make('small'),quantity:2.5}])[0].quantity,1);
assert.equal(M.money(800),'£8');assert.equal(M.money(2200),'£22');
console.log('Passed: all size prices, extra botanical, quantity totals, menu validation and safe saved-basket loading.');
