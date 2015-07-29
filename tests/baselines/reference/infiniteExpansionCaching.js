//// [infiniteExpansionCaching.ts]
interface A<T> {
    p: A<C<T>>;
    s: C<T>;
}

interface B<U> {
    p: B<D<U>>;
    s: D<U>;
}

interface C<T> {
    q: T;
}

interface D<U> {
    q: U;
}

var a: A<C<string>>;
var b: B<D<number>>;

a = b;

var c: C<string>;
var d: D<number>;

c = d; // Should not be allowed

//// [infiniteExpansionCaching.js]
var a;
var b;
a = b;
var c;
var d;
c = d; // Should not be allowed
