//@target: ES6
declare function foo<T, U>(x: T, fun: () => Iterator<(x: T) => U>, fun2: (y: U) => T): T;

foo("", function* () { yield x => x.length }, p => undefined); // T is fixed, should be string