//// [computedPropertyNames34_ES5.ts]
function foo<T>() { return '' }
class C<T> {
    static bar() {
        var obj = {
            [foo<T>()]() { }
        };
        return 0;
    }
}

//// [computedPropertyNames34_ES5.js]
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
function foo() { return ''; }
var C = (function () {
    function C() {
    }
    C.bar = function () {
        var obj = (_a = {},
            _a[_b = foo()] = function () { }, __names(_a, [_b]),
            _a);
        return 0;
        var _a, _b;
    };
    return C;
}());
