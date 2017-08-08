//// [genericObjectLitReturnType.ts]
class X<T>
{
    f(t: T) { return { a: t }; }
}

 
var x: X<number>;
var t1 = x.f(5);
t1.a = 5; // Should not error: t1 should have type {a: number}, instead has type {a: T}
 


//// [genericObjectLitReturnType.js]
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
var X = (function () {
    function X() {
    }
    X.prototype.f = function (t) { return { a: t }; };
    __names(X.prototype, ["f"]);
    return X;
}());
var x;
var t1 = x.f(5);
t1.a = 5; // Should not error: t1 should have type {a: number}, instead has type {a: T}
