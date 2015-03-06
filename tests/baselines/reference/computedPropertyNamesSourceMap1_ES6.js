//// [computedPropertyNamesSourceMap1_ES6.ts]
class C {
    ["hello"]() {
        debugger;
    }
}

//// [computedPropertyNamesSourceMap1_ES6.js]
var C = (function () {
    function C() {
    }
    C.prototype["hello"] = function () {
        debugger;
    };
    return C;
})();
//# sourceMappingURL=computedPropertyNamesSourceMap1_ES6.js.map