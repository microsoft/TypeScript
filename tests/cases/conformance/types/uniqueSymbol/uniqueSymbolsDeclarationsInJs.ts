// @target: esnext
// @lib: esnext
// @declaration: true
// @allowJs: true
// @checkJs: true
// @filename: uniqueSymbolsDeclarationsInJs.js
// @outFile: uniqueSymbolsDeclarationsInJs-out.js
// @useDefineForClassFields: false

// classes
class C {
    /**
     * @readonly
     */
    static readonlyStaticCall = Symbol();
    /**
     * @type {unique symbol}
     * @readonly
     */
    static readonlyStaticType;
    /**
     * @type {unique symbol}
     * @readonly
     */
    static readonlyStaticTypeAndCall = Symbol();
    static readwriteStaticCall = Symbol();

    /**
     * @readonly
     */
    readonlyCall = Symbol();
    readwriteCall = Symbol();
}

/** @type {unique symbol} */
const a = Symbol();
