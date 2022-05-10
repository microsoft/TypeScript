// @checkJs: true
// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: ./dist
// @filename: a.js

/**
 * @typedef A
 * @property {string} a
 */

/**
 * @typedef B
 * @property {number} b
 */

 class C1 {
    /**
     * @type {A}
     */
    value;
}

class C2 extends C1 {
    /**
     * @type {A}
     */
    value;
}

class C3 extends C1 {
    /**
     * @type {A & B}
     */
    value;
}
