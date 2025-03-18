//// [tests/cases/conformance/parser/ecmascript6/Symbols/parserSymbolProperty6.ts] ////

//// [parserSymbolProperty6.ts]
class C {
    [Symbol.toStringTag]: string = "";
}

//// [parserSymbolProperty6.js]
class C {
    [Symbol.toStringTag] = "";
}
