//@target: ES6
class C {
    [Symbol.iterator] = 0;
    [Symbol.unscopables]: number;
    [Symbol.toPrimitive]() { }
    get [Symbol.toStringTag]() {
        return 0;
    }
}