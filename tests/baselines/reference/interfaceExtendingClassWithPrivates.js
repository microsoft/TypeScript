//// [tests/cases/conformance/interfaces/interfacesExtendingClasses/interfaceExtendingClassWithPrivates.ts] ////

//// [interfaceExtendingClassWithPrivates.ts]
class Foo {
    private x: string;
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

//// [interfaceExtendingClassWithPrivates.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var i;
var r = i.y;
var r2 = i.x; // error
