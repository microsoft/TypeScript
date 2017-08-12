//// [numericIndexerConstraint1.ts]
class Foo { foo() { } }
var x: { [index: string]: number; };
var result: Foo = x["one"]; // error


//// [numericIndexerConstraint1.js]
var Foo = (function () {
    function Foo() {
    }
    var proto_1 = Foo.prototype;
    proto_1.foo = function () { };
    return Foo;
}());
var x;
var result = x["one"]; // error
