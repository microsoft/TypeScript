//// [staticMemberOfClassAndPublicMemberOfAnotherClassAssignment.ts]
interface A {
    prop();
}
class B {
    public prop() { }
}
class C {
    public static prop() { }
}

var a: A = new B();
a = new C(); // error prop is missing
a = B; // error prop is missing
a = C;

var b: B = new C(); // error prop is missing
b = B; // error prop is missing
b = C;
b = a;

var c: C = new B();
c = B;
c = C;
c = a;


//// [staticMemberOfClassAndPublicMemberOfAnotherClassAssignment.js]
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
var B = (function () {
    function B() {
    }
    B.prototype.prop = function () { };
    __names(B.prototype, ["prop"]);
    return B;
}());
var C = (function () {
    function C() {
    }
    C.prop = function () { };
    return C;
}());
var a = new B();
a = new C(); // error prop is missing
a = B; // error prop is missing
a = C;
var b = new C(); // error prop is missing
b = B; // error prop is missing
b = C;
b = a;
var c = new B();
c = B;
c = C;
c = a;
