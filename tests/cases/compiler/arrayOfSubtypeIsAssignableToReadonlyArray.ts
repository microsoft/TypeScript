class A { a }
class B extends A { b }
class C<T> extends Array<T> { c }
declare var ara: A[];
declare var arb: B[];
declare var cra: C<A>;
declare var crb: C<B>;
declare var rra: ReadonlyArray<A>;
declare var rrb: ReadonlyArray<B>;
rra = ara;
rrb = arb; // OK, Array<B> is assignable to ReadonlyArray<A>
rra = arb;
rrb = ara; // error: 'A' is not assignable to 'B'

rra = cra;
rra = crb; // OK, C<B> is assignable to ReadonlyArray<A>
rrb = crb;
rrb = cra; // error: 'A' is not assignable to 'B'
