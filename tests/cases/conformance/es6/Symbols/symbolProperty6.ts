//@target: ES6
class C {
    [Symbol.iterator] = 0;
    [Symbol.unscopables]: number;
    [Symbol.isRegExp]() { }
    get [Symbol.toStringTag]() {
        return 0;
    }
}