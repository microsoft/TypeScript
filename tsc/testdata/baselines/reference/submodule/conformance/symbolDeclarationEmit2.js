//// [tests/cases/conformance/es6/Symbols/symbolDeclarationEmit2.ts] ////

//// [symbolDeclarationEmit2.ts]
class C {
    [Symbol.toPrimitive] = "";
}

//// [symbolDeclarationEmit2.js]
class C {
    [Symbol.toPrimitive] = "";
}
