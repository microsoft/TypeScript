class X<T> { }
interface Foo<T> {
    z: Foo<X<T>>; // error
}
var f: Foo<number>;
var r = f.z; 


class C2<T> {
    x: T;
}
interface Foo2<T> {
    ofC4: C2<{ x: T }> // ok
}
var f2: Foo2<number>;
var r2 = f2.ofC4;
