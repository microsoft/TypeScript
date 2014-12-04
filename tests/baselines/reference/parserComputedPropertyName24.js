//// [parserComputedPropertyName24.ts]
class C {
    set [e](v) { }
}

//// [parserComputedPropertyName24.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, e, {
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();
