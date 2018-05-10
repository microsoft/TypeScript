//// [functionParameterArityMismatch.ts]
declare function f(a: number);
declare function f(a: number, b: number, c: number);
f();
f(1, 2);
f(1, 2, 3, 4);
f(1, 2, 3, 4, 5);

declare function g(a?: number);
declare function g(a: number, b: number, c: number, d: number, e?: number);
g(1, 2);
g(1, 2, 3);
g(1, 2, 3, 4, 5, 6, 7);

declare function h(a: number, b: number, c?: number);
h();
h(1);
h(1, 2, 3, 4);
h(1, 2, 3, 4, 5);

declare function i(a?: number, b?: number);
i(1, 2, 3);
i(1, 2, 3, 4);


//// [functionParameterArityMismatch.js]
f();
f(1, 2);
f(1, 2, 3, 4);
f(1, 2, 3, 4, 5);
g(1, 2);
g(1, 2, 3);
g(1, 2, 3, 4, 5, 6, 7);
h();
h(1);
h(1, 2, 3, 4);
h(1, 2, 3, 4, 5);
i(1, 2, 3);
i(1, 2, 3, 4);
