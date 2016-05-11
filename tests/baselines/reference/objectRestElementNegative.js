//// [objectRestElementNegative.ts]
let o = { a: 1, b: 'no' };
var { ...mustBeLast, a } = o;


//// [objectRestElementNegative.js]
var o = { a: 1, b: 'no' };
var mustBeLast = o.mustBeLast, a = o.a;
