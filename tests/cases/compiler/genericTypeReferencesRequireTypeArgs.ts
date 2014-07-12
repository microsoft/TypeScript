class C<T> {
   foo(): T { return null }
}
interface I<T> {
   bar(): T;
}
var c1: C; // error
var i1: I; // error
var c2: C<I>; // should be an error
var i2: I<C>; // should be an error
