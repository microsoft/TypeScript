//// [functionParameterArityMismatch.ts]
declare function f(x: number): number;
declare function f(x: number, y: number, z: number): number;
f(1, 2);


//// [arityMismatchError.js]
f(1, 2);
