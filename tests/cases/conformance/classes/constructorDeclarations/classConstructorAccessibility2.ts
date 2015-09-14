// @declaration: true

class A {
	private constructor(a: string) // only private access
	private constructor() { 
		
	}
	
	static method() {
		var t1 = new A("test"); // private is accessible in static method
	}
	
	method() {
		var t1 = new A("1"); // private is accessible in own class
	}
}

class A_ext extends A { // Cannot extend private class A
	method() {
		var t1 = new A(""); // error - A is private and only accessible in it's own class
	}
}

class B {
	protected constructor() {
	}
	
	method() {
		var t1 = new B(); // protected is accessible in own class
	}
}

class B_ext extends B {
	method() {
		var t1 = new B(); // protected is accessible in sub-class
	}
}

class C {
	public constructor(){
		
	}
	methodA() { 
		var t1 = new C(); // public is accessible anywhere
	}
}

// check global scope
var t1 = new A(""); // error - A is private
var t2 = new B(); // error - B is protected 
var t3 = new C();

// check Derived super call of a protected Base 
class Base {
    protected constructor() {
    }
}

class Derived extends Base {
    protected constructor() {
        super();
    }
}

class SuperDerived extends Derived {
	private constructor(){
		super();
	}
}

var baseCtor = Base;
baseCtor = Derived;