//// [overload3.ts]
declare function foo(x: number): void;
declare function foo(x: number, y: number, z: number): void;

foo(1, 2);


//// [overload3.js]
foo(1, 2);
