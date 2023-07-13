//// [tests/cases/conformance/es6/Symbols/symbolDeclarationEmit1.ts] ////

//// [symbolDeclarationEmit1.ts]
class C {
    [Symbol.toPrimitive]: number;
}

//// [symbolDeclarationEmit1.js]
class C {
}
Symbol.toPrimitive;


//// [symbolDeclarationEmit1.d.ts]
declare class C {
    [Symbol.toPrimitive]: number;
}
