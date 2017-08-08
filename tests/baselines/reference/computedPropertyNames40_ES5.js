//// [computedPropertyNames40_ES5.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: () => Foo2;

    // Computed properties
    [""]() { return new Foo }
    [""]() { return new Foo2 }
}

//// [computedPropertyNames40_ES5.js]
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
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
var Foo2 = (function () {
    function Foo2() {
    }
    return Foo2;
}());
var C = (function () {
    function C() {
    }
    // Computed properties
    C.prototype[_a = ""] = function () { return new Foo; };
    C.prototype[_b = ""] = function () { return new Foo2; };
    __names(C.prototype, [_a, _b]);
    return C;
    var _a, _b;
}());
