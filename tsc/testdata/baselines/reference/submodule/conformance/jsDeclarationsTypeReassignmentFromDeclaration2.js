//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsTypeReassignmentFromDeclaration2.ts] ////

//// [some-mod.d.ts]
interface Item {
    x: string;
}
declare function getItems(): Item[];
export = getItems;
//// [index.js]
const items = require("./some-mod")();
module.exports = items;

//// [index.js]
const items = require("./some-mod")();
module.exports = items;


//// [index.d.ts]
export = items;


//// [DtsFileErrors]


out/index.d.ts(1,10): error TS2304: Cannot find name 'items'.


==== out/index.d.ts (1 errors) ====
    export = items;
             ~~~~~
!!! error TS2304: Cannot find name 'items'.
    
==== some-mod.d.ts (0 errors) ====
    interface Item {
        x: string;
    }
    declare function getItems(): Item[];
    export = getItems;