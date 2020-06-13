//// [uniqueSymbolsDeclarationsInJs.js]
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


//// [uniqueSymbolsDeclarationsInJs-out.js]
// classes
class C {
    constructor() {
        /**
         * @readonly
         */
        this.readonlyCall = Symbol();
        this.readwriteCall = Symbol();
    }
}
/**
 * @readonly
 */
C.readonlyStaticCall = Symbol();
/**
 * @type {unique symbol}
 * @readonly
 */
C.readonlyStaticTypeAndCall = Symbol();
C.readwriteStaticCall = Symbol();


//// [uniqueSymbolsDeclarationsInJs-out.d.ts]
declare class C {
    /**
     * @readonly
     */
    static readonly readonlyStaticCall: unique symbol;
    /**
     * @type {unique symbol}
     * @readonly
     */
    static readonly readonlyStaticType: unique symbol;
    /**
     * @type {unique symbol}
     * @readonly
     */
    static readonly readonlyStaticTypeAndCall: unique symbol;
    static readwriteStaticCall: symbol;
    /**
     * @readonly
     */
    readonly readonlyCall: symbol;
    readwriteCall: symbol;
}
