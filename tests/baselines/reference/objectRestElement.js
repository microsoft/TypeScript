//// [objectRestElement.ts]
let o = { a: 1, b: 'no' };
var { ...clone } = o;
var { a, ...justB } = o;
var { a, b, ...empty } = o;


//// [objectRestElement.js]
var o = { a: 1, b: 'no' };
var clone = o.clone;
var a = o.a, justB = o.justB;
var a = o.a, b = o.b, empty = o.empty;
