//// [parserComputedPropertyName38.ts]
class C {
    [public]() { }
}

//// [parserComputedPropertyName38.js]
var C = (function () {
    function C() {
    }
    C.prototype[public] = function () { };
    return C;
})();
