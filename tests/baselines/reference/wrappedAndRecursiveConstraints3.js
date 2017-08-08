//// [wrappedAndRecursiveConstraints3.ts]
// no errors expected

class C<T extends { length: number }> {
    constructor(x: T) { }
    foo<U extends T>(x: U) {
        function bar<V extends U>(x: V) {
            return x;
        }
        return bar;
    }
}

var c = new C({ length: 2 });
var r = c.foo({ length: 3, charAt: (x: number) => { '' } });
var r2 = r('');

//// [wrappedAndRecursiveConstraints3.js]
// no errors expected
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
var C = (function () {
    function C(x) {
    }
    C.prototype.foo = function (x) {
        function bar(x) {
            return x;
        }
        return bar;
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
var c = new C({ length: 2 });
var r = c.foo({ length: 3, charAt: function (x) {
        '';
    } });
var r2 = r('');
