//// [tests/cases/conformance/es6/Symbols/symbolDeclarationEmit13.ts] ////

//// [symbolDeclarationEmit13.ts]
class C {
    get [Symbol.toPrimitive]() { return ""; }
    set [Symbol.toStringTag](x) { }
}

//// [symbolDeclarationEmit13.js]
class C {
    get [Symbol.toPrimitive]() { return ""; }
    set [Symbol.toStringTag](x) { }
}
