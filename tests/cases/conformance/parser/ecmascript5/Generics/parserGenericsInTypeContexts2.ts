class C extends A<X<T>, Y<Z<T>>> implements B<X<T>, Y<Z<T>>> {
}

var v1: C<X<T>, Y<Z<T>>>;
var v2: D<X<T>, Y<Z<T>>> = null;
var v3: E.F<X<T>, Y<Z<T>>>;
var v4: G.H.I<X<T>, Y<Z<T>>>;
var v6: K<X<T>, Y<Z<T>>>[];


function f1(a: E<X<T>, Y<Z<T>>>) {
}

function f2(): F<X<T>, Y<Z<T>>> {
}

