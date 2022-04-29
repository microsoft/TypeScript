//// [maxConstraints.ts]
interface Comparable<T> {
    compareTo(other: T): number;
}
interface Comparer {
    <T extends Comparable<T>>(x: T, y: T): T;
}
var max2: Comparer = (x, y) => { return (x.compareTo(y) > 0) ? x : y };
var maxResult = max2(1, 2);

//// [maxConstraints.js]
var max2 = function (x, y) { return (x.compareTo(y) > 0) ? x : y; };
var maxResult = max2(1, 2);
