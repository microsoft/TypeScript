//// [tests/cases/compiler/functionArgShadowing.ts] ////

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
class A {
    foo() { }
}
class B {
    bar() { }
}
function foo(x) {
    var x = new B();
    x.bar(); // the property bar does not exist on a value of type A
}
class C {
    p;
    constructor(p) {
        this.p = p;
        var p;
        var n = p;
    }
}
