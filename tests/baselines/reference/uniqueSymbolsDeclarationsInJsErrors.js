//// [tests/cases/conformance/types/uniqueSymbol/uniqueSymbolsDeclarationsInJsErrors.ts] ////

//// [uniqueSymbolsDeclarationsInJsErrors.js]
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


//// [uniqueSymbolsDeclarationsInJsErrors-out.js]
class C {
}


//// [uniqueSymbolsDeclarationsInJsErrors-out.d.ts]
declare class C {
    /**
     * @type {unique symbol}
     */
    static readwriteStaticType: unique symbol;
    /**
     * @type {unique symbol}
     * @readonly
     */
    static readonly readonlyType: unique symbol;
    /**
     * @type {unique symbol}
     */
    static readwriteType: unique symbol;
}
