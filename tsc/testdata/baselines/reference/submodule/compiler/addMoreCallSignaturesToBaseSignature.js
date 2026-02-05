//// [tests/cases/compiler/addMoreCallSignaturesToBaseSignature.ts] ////

//// [addMoreCallSignaturesToBaseSignature.ts]
interface Foo {
    (): string;
}

interface Bar extends Foo {
    (key: string): string;
}

var a: Bar;
var kitty = a();


//// [addMoreCallSignaturesToBaseSignature.js]
"use strict";
var a;
var kitty = a();
