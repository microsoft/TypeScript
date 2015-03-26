//// [recursiveInference1.ts]
function fib(x:number) { return x <= 1 ? x : fib(x - 1) + fib(x - 2); }
var result = fib(5);

//// [recursiveInference1.js]
function fib(x) { return x <= 1 ? x : fib(x - 1) + fib(x - 2); }
var result = fib(5);
