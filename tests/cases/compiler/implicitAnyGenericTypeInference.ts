// @noimplicitany: true

interface Comparer<T> {
    compareTo<U>(x: T, y: U): U;
}

var c: Comparer<any>;
c = { compareTo: (x, y) => { return y; } };
var r = c.compareTo(1, '');