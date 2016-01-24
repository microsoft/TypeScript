//// [computedPropertyNamesSourceMap1_ES5.ts]
class C {
    ["hello"]() {
        debugger;
    }
}

//// [computedPropertyNamesSourceMap1_ES5.js]
var C = (function () {
    function C() {
    }
    C.prototype["hello"] = function () {
        debugger;
    };
    return C;
}());
//# sourceMappingURL=computedPropertyNamesSourceMap1_ES5.js.map