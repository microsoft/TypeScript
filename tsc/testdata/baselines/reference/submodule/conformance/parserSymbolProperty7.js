//// [tests/cases/conformance/parser/ecmascript6/Symbols/parserSymbolProperty7.ts] ////

//// [parserSymbolProperty7.ts]
class C {
    [Symbol.toStringTag](): void { }
}

//// [parserSymbolProperty7.js]
class C {
    [Symbol.toStringTag]() { }
}
