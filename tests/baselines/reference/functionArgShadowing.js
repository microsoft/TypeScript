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
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.foo = function () { };
    return A;
}());
var B = (function () {
    function B() {
    }
    var proto_2 = B.prototype;
    proto_2.bar = function () { };
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
