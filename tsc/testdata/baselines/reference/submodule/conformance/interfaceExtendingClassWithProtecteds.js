//// [tests/cases/conformance/interfaces/interfacesExtendingClasses/interfaceExtendingClassWithProtecteds.ts] ////

//// [interfaceExtendingClassWithProtecteds.ts]
class Foo {
    protected x!: string;
}

interface I extends Foo { // error
    x: string;
}

interface I2 extends Foo {
    y: string;
}

declare var i: I2;
var r = i.y;
var r2 = i.x; // error

//// [interfaceExtendingClassWithProtecteds.js]
"use strict";
class Foo {
    x;
}
var r = i.y;
var r2 = i.x; // error
