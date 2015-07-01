//// [symbolProperty22.ts]
interface I<T, U> {
    [Symbol.unscopables](x: T): U;
}

declare function foo<T, U>(p1: T, p2: I<T, U>): U;

foo("", { [Symbol.unscopables]: s => s.length });

//// [symbolProperty22.js]
foo("", { [Symbol.unscopables]: s => s.length });
