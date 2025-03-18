//// [tests/cases/compiler/overloadOnConstConstraintChecks3.ts] ////

//// [overloadOnConstConstraintChecks3.ts]
class A { private x = 1} 
class B extends A {}
class C extends A {
    public foo() { }
}
function foo(name: 'hi'): B;
function foo(name: 'bye'): C;
function foo(name: string): A;
function foo(name: any): A {
    return null;
}


//// [overloadOnConstConstraintChecks3.js]
class A {
    x = 1;
}
class B extends A {
}
class C extends A {
    foo() { }
}
function foo(name) {
    return null;
}
