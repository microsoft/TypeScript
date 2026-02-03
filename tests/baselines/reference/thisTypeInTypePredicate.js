//// [tests/cases/conformance/types/thisType/thisTypeInTypePredicate.ts] ////

//// [thisTypeInTypePredicate.ts]
declare function filter<S>(f: (this: void, x: any) => x is S): S[];
const numbers = filter<number>((x): x is number => 'number' == typeof x)


//// [thisTypeInTypePredicate.js]
const numbers = filter((x) => 'number' == typeof x);
