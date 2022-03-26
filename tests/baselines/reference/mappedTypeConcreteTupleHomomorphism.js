//// [mappedTypeConcreteTupleHomomorphism.ts]
type A = [1, 2]

type B = {
    [K in keyof A]: `${A[K]}`
}

const b: B = ['1', '2']

type C<T> = {
    [K in keyof T]: [K, T[K]]
}

type D = {
    [K in keyof C<['c', 'd', 'e']>]: 1
}

const d: D = [1, 1, 1]

// repro from #27995
type Foo = ['a', 'b'];

interface Bar {
    a: string;
    b: number;
}

type Baz = { [K in keyof Foo]: Bar[Foo[K]]; };


//// [mappedTypeConcreteTupleHomomorphism.js]
var b = ['1', '2'];
var d = [1, 1, 1];
