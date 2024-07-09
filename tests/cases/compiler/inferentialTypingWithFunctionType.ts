declare function map<T, U>(x: T, f: (s: T) => U): U;
declare function identity<V>(y: V): V;

var s = map("", identity);