function foo<A>() {
    class X {
        m<B, C>() {
            return (function <D>() {
                class Y<E> {
                }
                return new Y<string>();
            })<Date>();
        }
    }
    var x = new X();
    return x.m<number, boolean>();
}
var x = foo<void>();
