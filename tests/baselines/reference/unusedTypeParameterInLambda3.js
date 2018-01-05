//// [unusedTypeParameterInLambda3.ts]
class A<T> {
    public x: T;
}

var y: new <T,U>(a:T)=>void;


//// [unusedTypeParameterInLambda3.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var y;
