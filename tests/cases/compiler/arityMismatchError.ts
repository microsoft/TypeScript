declare function f(a: number);
declare function f(a: number, b: number, c: number);
f();
f(1, 2);
f(1, 2, 3, 4);
f(1, 2, 3, 4, 5);

declare function g(a: number, ...b: number[]);
g();
g(1, 2, 3, 4, 5);
