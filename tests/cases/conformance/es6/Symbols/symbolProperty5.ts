//@target: ES6
var x = {
    [Symbol.iterator]: 0,
    [Symbol.isRegExp]() { },
    get [Symbol.toStringTag]() {
        return 0;
    }
}