// @target: esnext
// @lib: esnext
// @declaration: true
// @allowJs: true
// @checkJs: true
// @filename: uniqueSymbolsDeclarationsInJsErrors.js
// @outDir: out
// @useDefineForClassFields: false

class C {
    /**
     * @type {unique symbol}
     */
    static readwriteStaticType;
    /**
     * @type {unique symbol}
     * @readonly
     */
    static readonlyType;
    /**
     * @type {unique symbol}
     */
    static readwriteType;
}
