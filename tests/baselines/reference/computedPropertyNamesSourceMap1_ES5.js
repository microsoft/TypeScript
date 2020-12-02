//// [computedPropertyNamesSourceMap1_ES5.ts]
class C {
    ["hello"]() {
        debugger;
    }
    get ["goodbye"]() {
		return 0;
    }
}

//// [computedPropertyNamesSourceMap1_ES5.js]
var C = /** @class */ (function () {
    function C() {
    }
    var C_prototype = C.prototype;
    C_prototype["hello"] = function () {
        debugger;
    };
    Object.defineProperty(C_prototype, "goodbye", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
//# sourceMappingURL=computedPropertyNamesSourceMap1_ES5.js.map