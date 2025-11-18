//// [tests/cases/conformance/salsa/typedefModuleExportsIndirect1.ts] ////

//// [typedefModuleExportsIndirect1.js]
/** @typedef {{ a: 1, m: 1 }} C */
const dummy = 0;
module.exports = dummy;
//// [use.js]
/** @typedef {import('./typedefModuleExportsIndirect1').C} C */
/** @type {C} */
var c


//// [typedefModuleExportsIndirect1.js]
"use strict";
/** @typedef {{ a: 1, m: 1 }} C */
const dummy = 0;
module.exports = dummy;
//// [use.js]
"use strict";
/** @typedef {import('./typedefModuleExportsIndirect1').C} C */
/** @type {C} */
var c;


//// [typedefModuleExportsIndirect1.d.ts]
export type C = {
    a: 1;
    m: 1;
};
export = dummy;
//// [use.d.ts]
type C = import('./typedefModuleExportsIndirect1').C;
/** @typedef {import('./typedefModuleExportsIndirect1').C} C */
/** @type {C} */
declare var c: C;


//// [DtsFileErrors]


dist/typedefModuleExportsIndirect1.d.ts(5,1): error TS2309: An export assignment cannot be used in a module with other exported elements.
dist/typedefModuleExportsIndirect1.d.ts(5,10): error TS2304: Cannot find name 'dummy'.
dist/use.d.ts(1,52): error TS2694: Namespace 'unknown' has no exported member 'C'.


==== dist/typedefModuleExportsIndirect1.d.ts (2 errors) ====
    export type C = {
        a: 1;
        m: 1;
    };
    export = dummy;
    ~~~~~~~~~~~~~~~
!!! error TS2309: An export assignment cannot be used in a module with other exported elements.
             ~~~~~
!!! error TS2304: Cannot find name 'dummy'.
    
==== dist/use.d.ts (1 errors) ====
    type C = import('./typedefModuleExportsIndirect1').C;
                                                       ~
!!! error TS2694: Namespace 'unknown' has no exported member 'C'.
    /** @typedef {import('./typedefModuleExportsIndirect1').C} C */
    /** @type {C} */
    declare var c: C;
    