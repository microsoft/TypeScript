interface T<A> { a: A }
interface L<RT> extends T<RT['a']> {}
interface X extends L<X> {}
