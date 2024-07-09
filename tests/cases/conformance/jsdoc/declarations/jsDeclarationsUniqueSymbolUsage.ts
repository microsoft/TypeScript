// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @lib: es2017
// @filename: a.js
export const kSymbol = Symbol("my-symbol");

/**
 * @typedef {{[kSymbol]: true}} WithSymbol
 */
// @filename: b.js
/**
 * @returns {import('./a').WithSymbol} 
 * @param {import('./a').WithSymbol} value 
 */
export function b(value) {
    return value;
}
