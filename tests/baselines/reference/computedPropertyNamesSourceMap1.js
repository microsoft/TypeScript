//// [computedPropertyNamesSourceMap1.ts]
class C {
    ["hello"]() {
        debugger;
    }
}

//// [computedPropertyNamesSourceMap1.js]
var C = (function () {
    function C() {
    }
    C.prototype["hello"] = function () {
        debugger;
    };
    return C;
})();
//# sourceMappingURL=computedPropertyNamesSourceMap1.js.map