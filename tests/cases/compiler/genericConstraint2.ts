interface Comparable<T> {
    comparer(other: T): number;
}

function compare<T extends Comparable<T>>(x: T, y: T): number {
    if (x == null) return y == null ? 0 : -1;
    if (y == null) return 1;
    return x.comparer(y);
}

class ComparableString implements Comparable<string>{
    constructor(public currentValue: string) { }

    localeCompare(other) {
        return 0;
    }
}

var a = new ComparableString("a");
var b = new ComparableString("b");
var c = compare<ComparableString>(a, b);