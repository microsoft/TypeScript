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
export type C = {
    a: 1;
    m: 1;
};
export = o;
//// [use.d.ts]
type C = import('./typedefModuleExportsIndirect3').C;
/** @typedef {import('./typedefModuleExportsIndirect3').C} C */
/** @type {C} */
declare var c: C;


//// [DtsFileErrors]


dist/typedefModuleExportsIndirect3.d.ts(5,1): error TS2309: An export assignment cannot be used in a module with other exported elements.
dist/typedefModuleExportsIndirect3.d.ts(5,10): error TS2304: Cannot find name 'o'.
dist/use.d.ts(1,52): error TS2694: Namespace 'unknown' has no exported member 'C'.


==== dist/typedefModuleExportsIndirect3.d.ts (2 errors) ====
    export type C = {
        a: 1;
        m: 1;
    };
    export = o;
    ~~~~~~~~~~~
!!! error TS2309: An export assignment cannot be used in a module with other exported elements.
             ~
!!! error TS2304: Cannot find name 'o'.
    
==== dist/use.d.ts (1 errors) ====
    type C = import('./typedefModuleExportsIndirect3').C;
                                                       ~
!!! error TS2694: Namespace 'unknown' has no exported member 'C'.
    /** @typedef {import('./typedefModuleExportsIndirect3').C} C */
    /** @type {C} */
    declare var c: C;
    