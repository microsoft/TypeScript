//@target: ES6
interface I<T, U> {
    [Symbol.unscopables]: T;
    [Symbol.isConcatSpreadable]: U;
}

declare function foo<T, U>(p: I<T, U>): { t: T; u: U };

foo({
    [Symbol.isConcatSpreadable]: "",
    [Symbol.isRegExp]: 0,
    [Symbol.unscopables]: true
});