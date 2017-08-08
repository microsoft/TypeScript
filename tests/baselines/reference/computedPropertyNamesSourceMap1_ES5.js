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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
var C = (function () {
    function C() {
    }
    C.prototype[_a = "hello"] = function () {
        debugger;
    };
    Object.defineProperty(C.prototype, "goodbye", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    __names(C.prototype, [_a]);
    return C;
    var _a;
}());
//# sourceMappingURL=computedPropertyNamesSourceMap1_ES5.js.map