//// [computedPropertyNamesContextualType1_ES5.ts]
interface I {
    [s: string]: (x: string) => number;
    [s: number]: (x: any) => number; // Doesn't get hit
}

var o: I = {
    ["" + 0](y) { return y.length; },
    ["" + 1]: y => y.length
}

//// [computedPropertyNamesContextualType1_ES5.js]
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
var o = (_a = {},
    _a[_b = "" + 0] = function (y) { return y.length; },
    _a["" + 1] = function (y) { return y.length; }, __names(_a, [_b]),
    _a);
var _a, _b;
