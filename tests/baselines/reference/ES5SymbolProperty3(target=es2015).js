//// [tests/cases/conformance/Symbols/ES5SymbolProperty3.ts] ////

//// [ES5SymbolProperty3.ts]
var Symbol: any;

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

//// [ES5SymbolProperty3.js]
var Symbol;
class C {
    [Symbol.iterator]() { }
}
(new C)[Symbol.iterator];
