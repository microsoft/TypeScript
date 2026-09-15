//// [tests/cases/conformance/salsa/typedefModuleExportsIndirect2.ts] ////

//// [typedefModuleExportsIndirect2.js]
/** @typedef {{ a: 1, m: 1 }} C */
const f = function() {};
module.exports = f;
//// [use.js]
/** @typedef {import('./typedefModuleExportsIndirect2').C} C */
/** @type {C} */
var c


//// [typedefModuleExportsIndirect2.js]
"use strict";
/** @typedef {{ a: 1, m: 1 }} C */
const f = function () { };
module.exports = f;
//// [use.js]
"use strict";
/** @typedef {import('./typedefModuleExportsIndirect2').C} C */
/** @type {C} */
var c;


//// [typedefModuleExportsIndirect2.d.ts]
export = f;
/** @typedef {{ a: 1, m: 1 }} C */
export type C = {
    a: 1;
    m: 1;
};
declare const f: () => void;
//// [use.d.ts]
/** @typedef {import('./typedefModuleExportsIndirect2').C} C */
type C = import('./typedefModuleExportsIndirect2').C;
/** @type {C} */
declare var c: C;
