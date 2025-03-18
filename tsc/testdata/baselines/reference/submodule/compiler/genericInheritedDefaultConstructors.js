//// [tests/cases/compiler/genericInheritedDefaultConstructors.ts] ////

//// [genericInheritedDefaultConstructors.ts]
// repro from #8166
interface Constructor<T> {
    new(...args: any[]): T;
    prototype: T;
}

class A<U> { a: U; }
class B<V> extends A<V> { b: V; }
var c:Constructor<B<boolean>> = B; // shouldn't error here


//// [genericInheritedDefaultConstructors.js]
class A {
    a;
}
class B extends A {
    b;
}
var c = B;
