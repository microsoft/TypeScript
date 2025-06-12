//// [tests/cases/conformance/Symbols/ES5SymbolProperty5.ts] ////

//// [ES5SymbolProperty5.ts]
var Symbol: { iterator: symbol };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator](0) // Should error

//// [ES5SymbolProperty5.js]
var Symbol;
class C {
    [Symbol.iterator]() { }
}
(new C)[Symbol.iterator](0); // Should error
