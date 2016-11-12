// @target: ES5

class A {
	static get foo(): any {
		return this;
	}
}

class B extends A{}

A.foo;
B.foo;