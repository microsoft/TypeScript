//// [tests/cases/conformance/interfaces/interfaceDeclarations/interfaceWithCallSignaturesThatHidesBaseSignature.ts] ////

//// [interfaceWithCallSignaturesThatHidesBaseSignature.ts]
interface Foo {
    (): { a: number };
}

interface Derived extends Foo {
    (): { a: number; b: number };
}

var d: Derived;
var r = d();

//// [interfaceWithCallSignaturesThatHidesBaseSignature.js]
"use strict";
var d;
var r = d();
