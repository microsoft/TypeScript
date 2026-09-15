//// [tests/cases/conformance/salsa/typedefModuleExportsIndirect3.ts] ////

//// [typedefModuleExportsIndirect3.js]
/** @typedef {{ a: 1, m: 1 }} C */
const o = {};
module.exports = o;
//// [use.js]
/** @typedef {import('./typedefModuleExportsIndirect3').C} C */
/** @type {C} */
var c


//// [typedefModuleExportsIndirect3.js]
"use strict";
/** @typedef {{ a: 1, m: 1 }} C */
const o = {};
module.exports = o;
//// [use.js]
"use strict";
/** @typedef {import('./typedefModuleExportsIndirect3').C} C */
/** @type {C} */
var c;


//// [typedefModuleExportsIndirect3.d.ts]
export = o;
/** @typedef {{ a: 1, m: 1 }} C */
export type C = {
    a: 1;
    m: 1;
};
declare const o: {};
//// [use.d.ts]
/** @typedef {import('./typedefModuleExportsIndirect3').C} C */
type C = import('./typedefModuleExportsIndirect3').C;
/** @type {C} */
declare var c: C;
