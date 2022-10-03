//@target: ES6
interface I {
    [Symbol.unscopables]: number;
    [Symbol.toPrimitive]();
}