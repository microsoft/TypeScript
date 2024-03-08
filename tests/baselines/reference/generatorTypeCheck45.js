//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck45.ts] ////

//// [generatorTypeCheck45.ts]
declare function foo<T, U>(x: T, fun: () => Iterator<(x: T) => U>, fun2: (y: U) => T): T;

foo("", function* () { yield x => x.length }, p => undefined); // T is fixed, should be string

//// [generatorTypeCheck45.js]
foo("", function* () { yield x => x.length; }, p => undefined); // T is fixed, should be string
