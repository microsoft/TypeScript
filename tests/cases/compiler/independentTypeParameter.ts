// Repro for #26815
interface Foo<T> {}
function f<T>(arg: Foo<T>): T { return undefined!; }
let x: Foo<number> = {};
f(x);
