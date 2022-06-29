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
export const kSymbol: unique symbol;
export type WithSymbol = {
    [kSymbol]: true;
};
//// [b.d.ts]
import { type WithSymbol } from './a';
/**
 * @returns {import('./a').WithSymbol}
 * @param {import('./a').WithSymbol} value
 */
export function b(value: WithSymbol): WithSymbol;
