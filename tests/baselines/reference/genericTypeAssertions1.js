//// [genericTypeAssertions1.ts]
class A<T> { foo(x: T) { }}
var foo = new A<number>();
var r: A<string> = <A<number>>new A(); // error
var r2: A<number> = <A<A<number>>>foo; // error

//// [genericTypeAssertions1.js]
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
var A = (function () {
    function A() {
    }
    A.prototype.foo = function (x) { };
    __names(A.prototype, ["foo"]);
    return A;
}());
var foo = new A();
var r = new A(); // error
var r2 = foo; // error
