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
    var proto_1 = A.prototype;
    proto_1.foo = function () {
        return null;
    };
    return A;
}());
