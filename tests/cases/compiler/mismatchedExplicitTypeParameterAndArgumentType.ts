function map<T, U>(xs: T[], f: (x: T) => U) {
    var ys: U[] = [];
    xs.forEach(x => ys.push(f(x)));
    return ys;
}

var r0 = map([1, ""], (x) => x.toString());
var r5 = map<any, any>([1, ""], (x) => x.toString());
var r6 = map<Object, Object>([1, ""], (x) => x.toString());
var r7 = map<number, string>([1, ""], (x) => x.toString()); // error
var r7b = map<number>([1, ""], (x) => x.toString()); // error
var r8 = map<any, string>([1, ""], (x) => x.toString());