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
