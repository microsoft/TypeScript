//@target: ES6
interface I<T, U> {
    [Symbol.unscopables](x: T): U;
}

declare function foo<T, U>(p1: T, p2: I<T, U>): U;

foo("", { [Symbol.unscopables]: s => s.length });