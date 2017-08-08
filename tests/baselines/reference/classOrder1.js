//// [classOrder1.ts]
class A {
    public foo() {
        /*WScript.Echo("Here!");*/
    }
}

var a = new A();
a.foo();




//// [classOrder1.js]
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
    A.prototype.foo = function () {
        /*WScript.Echo("Here!");*/
    };
    __names(A.prototype, ["foo"]);
    return A;
}());
var a = new A();
a.foo();
