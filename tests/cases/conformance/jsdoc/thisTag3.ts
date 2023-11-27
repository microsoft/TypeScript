// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: /a.js

/**
 * @typedef {{fn(a: string): void}} T
 */

class C {
    /**
     * @this {T}
     * @param {string} a
     */
    p = (a) => this.fn("" + a);
}
