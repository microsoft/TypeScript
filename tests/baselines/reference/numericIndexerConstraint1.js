//// [tests/cases/compiler/numericIndexerConstraint1.ts] ////

//// [numericIndexerConstraint1.ts]
class Foo { foo() { } }
var x: { [index: string]: number; };
var result: Foo = x["one"]; // error


//// [numericIndexerConstraint1.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.foo = function () { };
    return Foo;
}());
var x;
var result = x["one"]; // error
