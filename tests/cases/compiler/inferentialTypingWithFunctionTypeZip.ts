var pair: <T, S>(x: T) => (y: S) => { x: T; y: S; }
var zipWith: <T, S, U>(a: T[], b: S[], f: (x: T) => (y: S) => U) => U[];
var result = zipWith([1, 2], ['a', 'b'], pair);
var i = result[0].x; // number