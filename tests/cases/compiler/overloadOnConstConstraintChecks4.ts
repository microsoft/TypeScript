class Z { }
class A extends Z { private x = 1 }
class B extends A {}
class C extends A {
    public foo() { }
}
function foo(name: 'hi'): B;
function foo(name: 'bye'): C;
function foo(name: string): A;
function foo(name: any): Z {
    return null;
}
