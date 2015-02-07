//// [parserComputedPropertyName12.ts]
class C {
   [e]() { }
}

//// [parserComputedPropertyName12.js]
var C = (function () {
    function C() {
    }
    C.prototype[e] = function () { };
    return C;
})();
