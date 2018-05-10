//// [functionParameterArityMismatch.ts]
declare function f(a: number);
declare function f(a: number, b: number, c: number);
f();
f(1, 2);
f(1, 2, 3, 4);
f(1, 2, 3, 4, 5);

declare function g();
declare function g(a: number, b: number, c: number);
g(1);
g(1, 2);
g(1, 2, 3, 4);

declare function h(a: number, b: number, c: number, d?: number);
h();
h(1);
h(1, 2);
h(1, 2, 3, 4, 5);


//// [functionParameterArityMismatch.js]
f();
f(1, 2);
f(1, 2, 3, 4);
f(1, 2, 3, 4, 5);
g(1);
g(1, 2);
g(1, 2, 3, 4);
h();
h(1);
h(1, 2);
h(1, 2, 3, 4, 5);
