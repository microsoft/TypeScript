//// [genericObjectLitReturnType.ts]
class X<T>
{
    f(t: T) { return { a: t }; }
}

 
var x: X<number>;
var t1 = x.f(5);
t1.a = 5; // Should not error: t1 should have type {a: number}, instead has type {a: T}
 


//// [genericObjectLitReturnType.js]
var X = /** @class */ (function () {
    function X() {
    }
    X.prototype.f = function (t) { return { a: t }; };
    return X;
}());
var x;
var t1 = x.f(5);
t1.a = 5; // Should not error: t1 should have type {a: number}, instead has type {a: T}
