//// [tests/cases/compiler/numericIndexerConstraint2.ts] ////

//// [numericIndexerConstraint2.ts]
class Foo { foo() { } }
var x: { [index: string]: Foo; };
var a: { one: number; };
x = a;

//// [numericIndexerConstraint2.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.foo = function () { };
    return Foo;
}());
var x;
var a;
x = a;
