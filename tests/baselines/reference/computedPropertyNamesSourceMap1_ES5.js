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
    var proto_1 = C.prototype;
    proto_1["hello"] = function () {
        debugger;
    };
    Object.defineProperty(proto_1, "goodbye", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
//# sourceMappingURL=computedPropertyNamesSourceMap1_ES5.js.map