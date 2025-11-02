//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsTypeReassignmentFromDeclaration.ts] ////

//// [some-mod.d.ts]
interface Item {
    x: string;
}
declare const items: Item[];
export = items;
//// [index.js]
/** @type {typeof import("/some-mod")} */
const items = [];
module.exports = items;

//// [index.js]
/** @type {typeof import("/some-mod")} */
const items = [];
module.exports = items;


//// [index.d.ts]
export = items;


//// [DtsFileErrors]


/out/index.d.ts(1,10): error TS2304: Cannot find name 'items'.


==== /some-mod.d.ts (0 errors) ====
    interface Item {
        x: string;
    }
    declare const items: Item[];
    export = items;
==== /out/index.d.ts (1 errors) ====
    export = items;
             ~~~~~
!!! error TS2304: Cannot find name 'items'.
    