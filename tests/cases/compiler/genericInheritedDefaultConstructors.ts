interface Constructor<T> {
    new(...args: any[]): T;
    prototype: T;
}

class A<U> { a: U; }
class B<V> extends A<V> { b: V; }
var c:Constructor<B<boolean>> = B; // error here
var x = new B<number>();

//class A1 { a: boolean; }
//class B1 extends A1 { b: boolean; }
//var c1:Constructor<B1> = B1; // no error here
