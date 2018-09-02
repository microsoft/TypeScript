//// [independentTypeParameter.ts]
// Repro for #26815
interface Foo<T> {}
function f<T>(arg: Foo<T>): T { return undefined!; }
let x: Foo<number> = {};
f(x);


//// [independentTypeParameter.js]
function f(arg) { return undefined; }
var x = {};
f(x);
