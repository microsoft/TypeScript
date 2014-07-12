//// [instantiateNonGenericTypeWithTypeArguments.js]
// it is an error to provide type arguments to a non-generic call
// all of these are errors
var C = (function () {
    function C() {
    }
    return C;
})();

var c = new C();

function Foo() {
}
var r = new Foo();

var f;
var r2 = new f();

var a;

// BUG 790977
var r2 = new a();
