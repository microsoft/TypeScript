function fib(x:number) { return x <= 1 ? x : fib(x - 1) + fib(x - 2); }
var result = fib(5);