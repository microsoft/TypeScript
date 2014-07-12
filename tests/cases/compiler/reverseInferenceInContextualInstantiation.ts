function compare<T>(a: T, b: T): number { return 0; }
var x: number[];
x.sort(compare); // Error, but shouldn't be
