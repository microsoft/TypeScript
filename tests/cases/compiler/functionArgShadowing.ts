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