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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var v = (_a = {},
    _a[_b = "hello"] = function () {
        debugger;
    },
    Object.defineProperty(_a, "goodbye", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    }), __names(_a, [_b]),
    _a);
var _a, _b;
//# sourceMappingURL=computedPropertyNamesSourceMap2_ES5.js.map