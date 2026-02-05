//// [tests/cases/conformance/Symbols/ES5SymbolProperty5.ts] ////

//// [ES5SymbolProperty5.ts]
declare var Symbol: { iterator: symbol };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator](0) // Should error

//// [ES5SymbolProperty5.js]
"use strict";
class C {
    [Symbol.iterator]() { }
}
(new C)[Symbol.iterator](0); // Should error
