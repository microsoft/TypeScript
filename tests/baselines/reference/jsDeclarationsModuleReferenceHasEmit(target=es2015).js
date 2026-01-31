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
/**
 * @module A
 */
class A {
}
/**
 * Target element
 * @type {module:A}
 */
export let el = null;
export default A;


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
