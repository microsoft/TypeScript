//// [tests/cases/compiler/chainedAssignment3.ts] ////

//// [chainedAssignment3.ts]
class A {
    id: number;
}

class B extends A {
    value: string;
}

var a: A;
var b: B;
a = b = null;
a = b = new B();
b = a = new B();

a.id = b.value = null;

// error cases
b = a = new A();
a = b = new A();




//// [chainedAssignment3.js]
class A {
    id;
}
class B extends A {
    value;
}
var a;
var b;
a = b = null;
a = b = new B();
b = a = new B();
a.id = b.value = null;
b = a = new A();
a = b = new A();
