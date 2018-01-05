//// [mismatchedClassConstructorVariable.ts]
var baz: foo;
class baz { }
class foo { }

//// [mismatchedClassConstructorVariable.js]
var baz;
var baz = /** @class */ (function () {
    function baz() {
    }
    return baz;
}());
var foo = /** @class */ (function () {
    function foo() {
    }
    return foo;
}());
