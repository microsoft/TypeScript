// repro from #8166
interface Constructor<T> {
    new(...args: any[]): T;
    prototype: T;
}

class A<U> { a: U; }
class B<V> extends A<V> { b: V; }
var c:Constructor<B<boolean>> = B; // shouldn't error here
