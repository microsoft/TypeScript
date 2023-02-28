// @strict: true
// @target: esnext

type Foo1<A,B> = [A, B] extends unknown[][] ? Bar1<[A, B]> : 'else'
type Bar1<T extends unknown[][]> = T

type Foo2<A> = Set<A> extends Set<unknown[]> ? Bar2<Set<A>> : 'else'
type Bar2<T extends Set<unknown[]>> = T
