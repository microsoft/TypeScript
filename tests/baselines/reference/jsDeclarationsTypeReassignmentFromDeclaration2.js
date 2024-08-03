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
var items = require("./some-mod")();
module.exports = items;


//// [index.d.ts]
export = items;
declare const items: Item[];


//// [DtsFileErrors]


out/index.d.ts(2,22): error TS2304: Cannot find name 'Item'.


==== out/index.d.ts (1 errors) ====
    export = items;
    declare const items: Item[];
                         ~~~~
!!! error TS2304: Cannot find name 'Item'.
    
==== some-mod.d.ts (0 errors) ====
    interface Item {
        x: string;
    }
    declare function getItems(): Item[];
    export = getItems;