function create<T>(ctor: { new(): T }) {
    return new ctor();
}
class C<U> { c: U }
class D<V> extends C<V> { d: V }
let d = create(D);

class A { a: number }
class B<T> extends A { b: T }
let b = create(B);

