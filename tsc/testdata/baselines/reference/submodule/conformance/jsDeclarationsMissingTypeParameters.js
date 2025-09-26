//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsMissingTypeParameters.ts] ////

//// [file.js]
/**
  * @param {Array=} y desc
  */
function x(y) { }

// @ts-ignore
/** @param {function (Array)} func Invoked
 */
function y(func) { return; }

/**
 * @return {(Array.<> | null)} list of devices
 */
function z() { return null ;}

/**
 * 
 * @return {?Promise} A promise
 */
function w() { return null; }

//// [file.js]
/**
  * @param {Array=} y desc
  */
function x(y) { }
// @ts-ignore
/** @param {function (Array)} func Invoked
 */
function y(func) { return; }
/**
 * @return {(Array.<> | null)} list of devices
 */
function z() { return null; }
/**
 *
 * @return {?Promise} A promise
 */
function w() { return null; }


//// [file.d.ts]
/**
  * @param {Array=} y desc
  */
declare function x(y?: Array | undefined): void;
/** @param {function (Array)} func Invoked
 */
declare function y(func: any): void;
/**
 * @return {(Array.<> | null)} list of devices
 */
declare function z(): (Array | null);
/**
 *
 * @return {?Promise} A promise
 */
declare function w(): Promise | null;
