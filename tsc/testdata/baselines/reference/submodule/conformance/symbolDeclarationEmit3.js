//// [tests/cases/conformance/es6/Symbols/symbolDeclarationEmit3.ts] ////

//// [symbolDeclarationEmit3.ts]
class C {
    [Symbol.toPrimitive](x: number);
    [Symbol.toPrimitive](x: string);
    [Symbol.toPrimitive](x: any) { }
}

//// [symbolDeclarationEmit3.js]
class C {
    [Symbol.toPrimitive](x) { }
}
