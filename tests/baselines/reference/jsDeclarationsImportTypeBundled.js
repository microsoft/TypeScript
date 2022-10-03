//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsImportTypeBundled.ts] ////

//// [mod1.js]
/**
 * @typedef {{x: number}} Item
 */
/**
 * @type {Item};
 */
const x = {x: 12};
module.exports = x;
//// [index.js]
/** @type {(typeof import("./folder/mod1"))[]} */
const items = [{x: 12}];
module.exports = items;

//// [out.js]
/**
 * @typedef {{x: number}} Item
 */
/**
 * @type {Item};
 */
var x = { x: 12 };
module.exports = x;
/** @type {(typeof import("./folder/mod1"))[]} */
var items = [{ x: 12 }];
module.exports = items;


//// [out.d.ts]
declare module "folder/mod1" {
    export = x;
    /**
     * @typedef {{x: number}} Item
     */
    /**
     * @type {Item};
     */
    const x: Item;
    namespace x {
        export { Item };
    }
    type Item = {
        x: number;
    };
}
declare module "index" {
    export = items;
    /** @type {(typeof import("./folder/mod1"))[]} */
    const items: (typeof import("folder/mod1"))[];
}
