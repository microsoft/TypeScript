//// [noTypeArgumentOnReturnType1.ts]
class A<T>{
 
 foo(): A{
  return null;
 }
}

//// [noTypeArgumentOnReturnType1.js]
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
        return null;
    };
    return A;
}());
