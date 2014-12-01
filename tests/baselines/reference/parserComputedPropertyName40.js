//// [parserComputedPropertyName40.ts]
class C {
    [a ? "" : ""]() {}
}

//// [parserComputedPropertyName40.js]
var C = (function () {
    function C() {
    }
    C.prototype[a ? "" : ""] = function () {
    };
    return C;
})();
