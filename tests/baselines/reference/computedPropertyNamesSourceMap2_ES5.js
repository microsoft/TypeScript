//// [computedPropertyNamesSourceMap2_ES5.ts]
var v = {
    ["hello"]() {
        debugger;
	},
    get ["goodbye"]() {
		return 0;
	}
}

//// [computedPropertyNamesSourceMap2_ES5.js]
var _a;
var v = (_a = {},
    _a["hello"] = function () {
        debugger;
    },
    Object.defineProperty(_a, "goodbye", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    }),
    _a);
//# sourceMappingURL=computedPropertyNamesSourceMap2_ES5.js.map