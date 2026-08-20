// @target: es2015
var va = [(() => {})()]; // ok
(() => {})(); // ok
function foo(s:string) {}
foo((()=>{})()); // error
