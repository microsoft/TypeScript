//// [anyAsGenericFunctionCall.js]
// any is considered an untyped function call
// can be called except with type arguments which is an error
var x;
var a = x();
var b = x('hello');

var C = (function () {
    function C() {
    }
    return C;
})();
var c = x(x);
var d = x(x);
