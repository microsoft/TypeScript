//// [tests/cases/conformance/interfaces/interfacesExtendingClasses/interfaceExtendingClassWithPrivates2.ts] ////

//// [interfaceExtendingClassWithPrivates2.ts]
class Foo {
    private x: string;
}

class Bar {
    private x: string;
}

interface I3 extends Foo, Bar { // error
}

interface I4 extends Foo, Bar { // error
    x: string;
}

class Baz {
    private y: string;
}

interface I5 extends Foo, Baz {
    z: string;
}

var i: I5;
var r: string = i.z;
var r2 = i.x; // error
var r3 = i.y; // error

//// [interfaceExtendingClassWithPrivates2.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
var Baz = /** @class */ (function () {
    function Baz() {
    }
    return Baz;
}());
var i;
var r = i.z;
var r2 = i.x; // error
var r3 = i.y; // error
