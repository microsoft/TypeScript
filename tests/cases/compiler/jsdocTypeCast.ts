// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @filename: jsdocTypeCast.js

/**
 * @param {string} x
 */
 function f(x) {
    /** @type {'a' | 'b'} */
    let a = (x); // Error
    a;

    /** @type {'a' | 'b'} */
    let b = (((x))); // Error
    b;

    /** @type {'a' | 'b'} */
    let c = /** @type {'a' | 'b'} */ (x); // Ok
    c;
}
