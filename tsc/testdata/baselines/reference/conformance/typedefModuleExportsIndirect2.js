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
export type C = {
    a: 1;
    m: 1;
};
export = f;
//// [use.d.ts]
type C = import('./typedefModuleExportsIndirect2').C;
/** @typedef {import('./typedefModuleExportsIndirect2').C} C */
/** @type {C} */
declare var c: C;


//// [DtsFileErrors]


dist/typedefModuleExportsIndirect2.d.ts(5,1): error TS2309: An export assignment cannot be used in a module with other exported elements.
dist/typedefModuleExportsIndirect2.d.ts(5,10): error TS2304: Cannot find name 'f'.
dist/use.d.ts(1,52): error TS2694: Namespace 'unknown' has no exported member 'C'.


==== dist/typedefModuleExportsIndirect2.d.ts (2 errors) ====
    export type C = {
        a: 1;
        m: 1;
    };
    export = f;
    ~~~~~~~~~~~
!!! error TS2309: An export assignment cannot be used in a module with other exported elements.
             ~
!!! error TS2304: Cannot find name 'f'.
    
==== dist/use.d.ts (1 errors) ====
    type C = import('./typedefModuleExportsIndirect2').C;
                                                       ~
!!! error TS2694: Namespace 'unknown' has no exported member 'C'.
    /** @typedef {import('./typedefModuleExportsIndirect2').C} C */
    /** @type {C} */
    declare var c: C;
    