//// [objectSpreadNoTransform.ts]
const y = { a: 'yes', b: 'no' };
const o = { x: 1, ...y };
var b;
var rest: any;
({ b, ...rest } = o);


//// [objectSpreadNoTransform.js]
const y = { a: 'yes', b: 'no' };
const o = { x: 1, ...y };
var b;
var rest;
({ b, ...rest } = o);
