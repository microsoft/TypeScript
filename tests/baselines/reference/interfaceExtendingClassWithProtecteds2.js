//// [interfaceExtendingClassWithProtecteds2.ts]
class Foo {
    protected x: string;
}

class Bar {
    protected x: string;
}

interface I3 extends Foo, Bar { // error
}

interface I4 extends Foo, Bar { // error
    x: string;
}

class Baz {
    protected y: string;
}

interface I5 extends Foo, Baz {
    z: string;
}

var i: I5;
var r: string = i.z;
var r2 = i.x; // error
var r3 = i.y; // error

//// [interfaceExtendingClassWithProtecteds2.js]
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
var Bar = (function () {
    function Bar() {
    }
    return Bar;
}());
var Baz = (function () {
    function Baz() {
    }
    return Baz;
}());
var i;
var r = i.z;
var r2 = i.x; // error
var r3 = i.y; // error
