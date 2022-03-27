//// [mappedTypeConcreteTupleHomomorphism.ts]
type TupleOfNumbers = [1, 2]

type HomomorphicType = {
    [K in keyof TupleOfNumbers]: `${TupleOfNumbers[K]}`
}

const homomorphic: HomomorphicType = ['1', '2']

type GenericType<T> = {
    [K in keyof T]: [K, T[K]]
}

type HomomorphicInstantiation = {
    [K in keyof GenericType<['c', 'd', 'e']>]: 1
}

const d: HomomorphicInstantiation = [1, 1, 1]

type TupleOfNumbersAndObjects = [1, 2, {}]

type ShouldErrorOnInterpolation = {
    [K in keyof TupleOfNumbersAndObjects]: `${TupleOfNumbersAndObjects[K]}`
}

// repro from #27995
type Foo = ['a', 'b'];

interface Bar {
    a: string;
    b: number;
}

type Baz = { [K in keyof Foo]: Bar[Foo[K]]; };


//// [mappedTypeConcreteTupleHomomorphism.js]
var homomorphic = ['1', '2'];
var d = [1, 1, 1];
