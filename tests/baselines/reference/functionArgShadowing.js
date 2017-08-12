//// [functionArgShadowing.ts]
class A { foo() { } }
class B { bar() { } }
function foo(x: A) {
   var x: B = new B();
     x.bar(); // the property bar does not exist on a value of type A
}
 
class C {
	constructor(public p: number) {
		var p: string;

		var n: number = p;
	}
}

//// [functionArgShadowing.js]
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
    A.prototype.foo = function () { };
    __names(A.prototype, ["foo"]);
    return A;
}());
var B = (function () {
    function B() {
    }
    B.prototype.bar = function () { };
    __names(B.prototype, ["bar"]);
    return B;
}());
function foo(x) {
    var x = new B();
    x.bar(); // the property bar does not exist on a value of type A
}
var C = (function () {
    function C(p) {
        this.p = p;
        var p;
        var n = p;
    }
    return C;
}());
