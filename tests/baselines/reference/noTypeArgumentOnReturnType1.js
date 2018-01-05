//// [noTypeArgumentOnReturnType1.ts]
class A<T>{
 
 foo(): A{
  return null;
 }
}

//// [noTypeArgumentOnReturnType1.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () {
        return null;
    };
    return A;
}());
