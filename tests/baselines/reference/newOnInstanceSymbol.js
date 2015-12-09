//// [newOnInstanceSymbol.ts]
class C {}
var x = new C(); // should be ok
new x(); // should error

//// [newOnInstanceSymbol.js]
var C = (function () {
    function C() {
    }
    return C;
}());
var x = new C(); // should be ok
new x(); // should error
