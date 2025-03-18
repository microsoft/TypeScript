//// [tests/cases/compiler/overloadOnConstConstraintChecks2.ts] ////

//// [overloadOnConstConstraintChecks2.ts]
class A {} 
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

//// [overloadOnConstConstraintChecks2.js]
class A {
}
class B extends A {
}
class C extends A {
    foo() { }
}
function foo(name) {
    return null;
}
