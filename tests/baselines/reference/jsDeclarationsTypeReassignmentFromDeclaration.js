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
var items = [];
module.exports = items;


//// [index.d.ts]
export = items;
/** @type {typeof import("/some-mod")} */
declare const items: typeof import("/some-mod");
