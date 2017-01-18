interface Array<T> {
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: this) => T,
        initialValue?: T): T;
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: this) => U,
        initialValue: U): U;
}
var a: Array<string>;
var r5 = a.reduce((x, y) => x + y);