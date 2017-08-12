//// [noTypeArgumentOnReturnType1.ts]
class A<T>{
 
 foo(): A{
  return null;
 }
}

//// [noTypeArgumentOnReturnType1.js]
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
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
        return null;
    };
    __names(A.prototype, ["foo"]);
    return A;
}());
