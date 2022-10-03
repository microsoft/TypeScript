//// [customEventDetail.ts]
var x: CustomEvent;

// valid since detail is any
x.initCustomEvent('hello', true, true, { id: 12, name: 'hello' });
var y = x.detail.name;

//// [customEventDetail.js]
var x;
// valid since detail is any
x.initCustomEvent('hello', true, true, { id: 12, name: 'hello' });
var y = x.detail.name;
