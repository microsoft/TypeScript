// @declaration: true
// @skipLibCheck: false

class A { }

var a = <A,>(x: A) => x;
function a2<A,>(x: A) { return x }

var a3 = <A,>(x: A) => new A();
function a4<A,>(x: A) { return new A() }


interface B { }

var b = <B,>(x: B) => x;
function b2<B,>(x: B) { return x }
