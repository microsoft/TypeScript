//// [parserES5ComputedPropertyName3.ts]
var v = { [e]() { } };

//// [parserES5ComputedPropertyName3.js]
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
var v = (_a = {}, _a[_b = e] = function () { }, __names(_a, [_b]), _a);
var _a, _b;
