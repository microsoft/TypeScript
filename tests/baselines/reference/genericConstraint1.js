//// [genericConstraint1.ts]
class C<T> {
    public bar2<U extends T>(x: T, y: U): T {
        return null;
    }
}

var x = new C<number>();
x.bar2<string>(2, "");

//// [genericConstraint1.js]
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
    C.prototype.bar2 = function (x, y) {
        return null;
    };
    __names(C.prototype, ["bar2"]);
    return C;
}());
var x = new C();
x.bar2(2, "");
