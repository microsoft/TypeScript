//// [mismatchedClassConstructorVariable.ts]
var baz: foo;
class baz { }
class foo { }

//// [mismatchedClassConstructorVariable.js]
var baz;
var baz = (function () {
    function baz() {
    }
    return baz;
}());
var foo = (function () {
    function foo() {
    }
    return foo;
}());
