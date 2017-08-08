//// [classExpressionTest2.ts]
function M() {
    var m = class C<X> {
        f<T>() {
            var t: T;
            var x: X;
            return { t, x };
        }
    }

    var v = new m<number>();
    return v.f<string>();
}

//// [classExpressionTest2.js]
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
function M() {
    var m = (function () {
        function C() {
        }
        C.prototype.f = function () {
            var t;
            var x;
            return { t: t, x: x };
        };
        __names(C.prototype, ["f"]);
        return C;
    }());
    var v = new m();
    return v.f();
}
