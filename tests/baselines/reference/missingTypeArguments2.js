//// [missingTypeArguments2.ts]
class A<T> { }

var x: () => A;
(a: A) => { };
var y: A<A>;
(): A => null;

//// [missingTypeArguments2.js]
var A = (function () {
    function A() {
    }
    return A;
}());
var x;
(function (a) { });
var y;
(function () { return null; });
