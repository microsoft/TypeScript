// @target: es2015
// @strict: false
// Repro from #26835
declare function foo<T>(a: T, b: T);
declare function foo(a: {});
foo<string>("hello");
