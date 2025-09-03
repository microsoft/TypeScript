//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractGeneric.ts] ////

//// [classAbstractGeneric.ts]
abstract class A<T> {
    t: T;
    
    abstract foo(): T;
    abstract bar(t: T);
}

abstract class B<T> extends A<T> {}

class C<T> extends A<T> {} // error -- inherits abstract methods

class D extends A<number> {} // error -- inherits abstract methods

class E<T> extends A<T> { // error -- doesn't implement bar
    foo() { return this.t; }
}

class F<T> extends A<T> { // error -- doesn't implement foo
    bar(t : T) {}
}

class G<T> extends A<T> {
    foo() { return this.t; }
    bar(t: T) { }
}

//// [classAbstractGeneric.js]
class A {
    t;
}
class B extends A {
}
class C extends A {
} // error -- inherits abstract methods
class D extends A {
} // error -- inherits abstract methods
class E extends A {
    foo() { return this.t; }
}
class F extends A {
    bar(t) { }
}
class G extends A {
    foo() { return this.t; }
    bar(t) { }
}
