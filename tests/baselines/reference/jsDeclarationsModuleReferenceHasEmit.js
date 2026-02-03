//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsModuleReferenceHasEmit.ts] ////

//// [index.js]
/**
 * @module A
 */
class A {}


/**
 * Target element
 * @type {module:A}
 */
export let el = null;

export default A;

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.el = void 0;
/**
 * @module A
 */
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
/**
 * Target element
 * @type {module:A}
 */
exports.el = null;
exports.default = A;


//// [index.d.ts]
/**
 * Target element
 * @type {module:A}
 */
export let el: any;
export default A;
/**
 * @module A
 */
declare class A {
}
