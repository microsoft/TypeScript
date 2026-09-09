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


//// [uniqueSymbolsDeclarationsInJsErrors.js]
"use strict";
class C {
}


//// [uniqueSymbolsDeclarationsInJsErrors.d.ts]
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
