//// [tests/cases/conformance/Symbols/ES5SymbolProperty6.ts] ////

//// [ES5SymbolProperty6.ts]
class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

//// [ES5SymbolProperty6.js]
class C {
    [Symbol.iterator]() { }
}
(new C)[Symbol.iterator];
