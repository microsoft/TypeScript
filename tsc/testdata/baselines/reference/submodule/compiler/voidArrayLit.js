//// [tests/cases/compiler/voidArrayLit.ts] ////

//// [voidArrayLit.ts]
var va = [(() => {})()]; // ok
(() => {})(); // ok
function foo(s:string) {}
foo((()=>{})()); // error


//// [voidArrayLit.js]
var va = [(() => { })()];
(() => { })();
function foo(s) { }
foo((() => { })());
