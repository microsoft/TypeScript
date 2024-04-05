//// [tests/cases/compiler/functionCall18.ts] ////

//// [functionCall18.ts]
// Repro from #26835
declare function foo<T>(a: T, b: T);
declare function foo(a: {});
foo<string>("hello");


//// [functionCall18.js]
foo("hello");
