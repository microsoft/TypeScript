//// [tests/cases/compiler/propertyOrdering2.ts] ////

//// [propertyOrdering2.ts]
class Foo {
    constructor(public x, y) { }
       foo() {
        var a = this.x;
        return this.y;
    }
}


//// [propertyOrdering2.js]
var Foo = /** @class */ (function () {
    function Foo(x, y) {
        this.x = x;
    }
    Foo.prototype.foo = function () {
        var a = this.x;
        return this.y;
    };
    return Foo;
}());
