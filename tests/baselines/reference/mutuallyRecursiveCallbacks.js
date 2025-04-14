//// [tests/cases/compiler/mutuallyRecursiveCallbacks.ts] ////

//// [mutuallyRecursiveCallbacks.ts]
// Repro from #18277

interface Foo<T> { (bar: Bar<T>): void };
type Bar<T> = (foo: Foo<T>) => Foo<T>;
declare function foo<T>(bar: Bar<T>): void;
declare var bar: Bar<{}>;
bar = foo;


//// [mutuallyRecursiveCallbacks.js]
// Repro from #18277
;
bar = foo;
