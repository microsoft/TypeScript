//// [tests/cases/conformance/Symbols/ES5SymbolProperty4.ts] ////

//// [ES5SymbolProperty4.ts]
var Symbol: { iterator: string };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

//// [ES5SymbolProperty4.js]
var Symbol;
class C {
    [Symbol.iterator]() { }
}
(new C)[Symbol.iterator];
