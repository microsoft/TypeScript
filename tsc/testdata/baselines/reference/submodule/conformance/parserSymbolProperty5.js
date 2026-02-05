//// [tests/cases/conformance/parser/ecmascript6/Symbols/parserSymbolProperty5.ts] ////

//// [parserSymbolProperty5.ts]
class C {
    [Symbol.toPrimitive]: string;
}

//// [parserSymbolProperty5.js]
"use strict";
class C {
    [Symbol.toPrimitive];
}
