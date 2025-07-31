//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsUniqueSymbolUsage.ts] ////

//// [a.js]
export const kSymbol = Symbol("my-symbol");

/**
 * @typedef {{[kSymbol]: true}} WithSymbol
 */
//// [b.js]
/**
 * @returns {import('./a').WithSymbol} 
 * @param {import('./a').WithSymbol} value 
 */
export function b(value) {
    return value;
}




//// [a.d.ts]
export declare const kSymbol: unique symbol;
export type WithSymbol = {
    [kSymbol]: true;
};
/**
 * @typedef {{[kSymbol]: true}} WithSymbol
 */ 
//// [b.d.ts]
/**
 * @returns {import('./a').WithSymbol}
 * @param {import('./a').WithSymbol} value
 */
export declare function b(value: import('./a').WithSymbol): import('./a').WithSymbol;
