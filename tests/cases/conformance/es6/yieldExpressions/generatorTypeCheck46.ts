//@target: ES6
declare function foo<T, U>(x: T, fun: () => Iterable<(x: T) => U>, fun2: (y: U) => T): T;

foo("", function* () {
    yield* {
        *[Symbol.iterator]() {
            yield x => x.length
        }
    }
}, p => undefined); // T is fixed, should be string