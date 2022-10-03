// scenario 1
interface ISomething {
   something: number;
}

var s: ISomething = <ISomething>({ });


// scenario 2
interface A { x: string; }

interface B extends A { }

var x: B = <B>{ };

class C1 {
	public x: string;
}

class C2 extends C1 {}

var y1: C1 = new C2();
var y2: C1 = <C1> new C2();
var y3: C1 = <C1> {};

