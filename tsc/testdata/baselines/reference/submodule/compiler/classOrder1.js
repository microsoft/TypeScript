//// [tests/cases/compiler/classOrder1.ts] ////

//// [classOrder1.ts]
class A {
    public foo() {
        /*WScript.Echo("Here!");*/
    }
}

var a = new A();
a.foo();




//// [classOrder1.js]
class A {
    foo() {
    }
}
var a = new A();
a.foo();
