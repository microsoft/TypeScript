//// [implicitAnyGenericTypeInference.ts]
interface Comparer<T> {
    compareTo<U>(x: T, y: U): U;
}

var c: Comparer<any>;
c = { compareTo: (x, y) => { return y; } };
var r = c.compareTo(1, '');

//// [implicitAnyGenericTypeInference.js]
var c;
c = { compareTo: function (x, y) { return y; } };
var r = c.compareTo(1, '');
