//// [tests/cases/conformance/es6/Symbols/symbolDeclarationEmit14.ts] ////

//// [symbolDeclarationEmit14.ts]
class C {
    get [Symbol.toPrimitive]() { return ""; }
    get [Symbol.toStringTag]() { return ""; }
}

//// [symbolDeclarationEmit14.js]
"use strict";
class C {
    get [Symbol.toPrimitive]() { return ""; }
    get [Symbol.toStringTag]() { return ""; }
}


//// [symbolDeclarationEmit14.d.ts]
declare class C {
    get [Symbol.toPrimitive](): string;
    get [Symbol.toStringTag](): string;
}
