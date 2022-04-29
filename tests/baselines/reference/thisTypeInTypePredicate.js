//// [thisTypeInTypePredicate.ts]
declare function filter<S>(f: (this: void, x: any) => x is S): S[];
const numbers = filter<number>((x): x is number => 'number' == typeof x)


//// [thisTypeInTypePredicate.js]
var numbers = filter(function (x) { return 'number' == typeof x; });
