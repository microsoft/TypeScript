// @target: es2015

class A extends B {

  foo() { this.bar(); }

}

class B {

  bar() { }

}


var a = new A();

a.foo();

