//// [tests/cases/compiler/varAsID.ts] ////

//// [varAsID.ts]
class Foo {
    var; // ok
    x=1;
}

var f = new Foo();


class Foo2 {
    var // not an error, because of ASI.
    x=1;
}

var f2 = new Foo2();





//// [varAsID.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.x = 1;
    }
    return Foo;
}());
var f = new Foo();
var Foo2 = /** @class */ (function () {
    function Foo2() {
        this.x = 1;
    }
    return Foo2;
}());
var f2 = new Foo2();
