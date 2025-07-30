//// [tests/cases/conformance/jsdoc/jsdocTypeParameterTagConflict.ts] ////

//// [a.js]
/**
 * @type {(a: 1) => true}
 * @param {2} a
 */
export function conflictingParam(a) { return true }

/**
 * @type {(b: 3) => true}
 * @return {false}
 */
export function conflictingReturn(b) { return false }


/**
 * @type {(c: 4) => true}
 * @param {5} d
 * @return {false}
 */
export function conflictingBoth(d) { return false }





//// [a.d.ts]
/**
 * @type {(a: 1) => true}
 * @param {2} a
 */
export declare function conflictingParam(a: 2): true;
/**
 * @type {(b: 3) => true}
 * @return {false}
 */
export declare function conflictingReturn(b: 3): false;
/**
 * @type {(c: 4) => true}
 * @param {5} d
 * @return {false}
 */
export declare function conflictingBoth(d: 5): false;
