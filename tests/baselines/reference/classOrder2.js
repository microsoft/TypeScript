//// [tests/cases/compiler/classOrder2.ts] ////

//// [classOrder2.ts]
class A extends B {

  foo() { this.bar(); }

}

class B {

  bar() { }

}


var a = new A();

a.foo();



//// [classOrder2.js]
class A extends B {
    foo() { this.bar(); }
}
class B {
    bar() { }
}
var a = new A();
a.foo();
