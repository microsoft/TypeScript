//// [tests/cases/conformance/interfaces/interfacesExtendingClasses/interfaceExtendingClassWithProtecteds.ts] ////

//// [interfaceExtendingClassWithProtecteds.ts]
class Foo {
    protected x: string;
}

interface I extends Foo { // error
    x: string;
}

interface I2 extends Foo {
    y: string;
}

var i: I2;
var r = i.y;
var r2 = i.x; // error

//// [interfaceExtendingClassWithProtecteds.js]
class Foo {
    x;
}
var i;
var r = i.y;
var r2 = i.x;
