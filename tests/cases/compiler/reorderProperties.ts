interface A<T> {
    x: T
}

interface B<T> {
    x: T
}

interface C<S> extends A<D<S>> {
    y: S
}

interface D<S> extends B<C<S>> {
    y: S
}

var c: C<{ s: string; n: number }>
var d: D<{ n: number; s: string }> = c
