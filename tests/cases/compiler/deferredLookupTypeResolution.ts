// @strict: true
// @declaration: true

// Repro from #17456

type StringContains<S extends string, L extends string> = (
    { [K in S]:      'true' } &
    { [key: string]: 'false' }
  )[L]

type ObjectHasKey<O, L extends string> = StringContains<Extract<keyof O, string>, L>

type First<T> = ObjectHasKey<T, '0'>;  // Should be deferred

type T1 = ObjectHasKey<{ a: string }, 'a'>;  // 'true'
type T2 = ObjectHasKey<{ a: string }, 'b'>;  // 'false'

// Verify that mapped type isn't eagerly resolved in type-to-string operation

declare function f1<A extends string, B extends string>(a: A, b: B): { [P in A | B]: any };

function f2<A extends string>(a: A) {
    return f1(a, 'x');
}

function f3(x: 'a' | 'b') {
    return f2(x);
}
