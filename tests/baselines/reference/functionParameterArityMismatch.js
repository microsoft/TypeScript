//// [functionParameterArityMismatch.ts]
declare function f1(a: number);
declare function f1(a: number, b: number, c: number);
f1();
f1(1, 2);
f1(1, 2, 3, 4);

declare function f2(a?: number);
declare function f2(a: number, b: number, c: number, ...d: number[]);
f2(1, 2);

declare function f3();
declare function f3(a: number, b: number);
declare function f3(a: number, b: number, c: number, d: number, e?: number);
f3(1);
f3(1, 2, 3);

declare function f4();
declare function f4(a: number, b: number);
declare function f4(a: number, b: number, c: number, d: number, ...e: number[]);
f4(1);
f4(1, 2, 3);

declare function f5(a?: number, b?: number);
declare function f5(a: number, b: number, c: number, d: number, e?: number);
f5(1, 2, 3);
f5(1, 2, 3, 4, 5, 6);


//// [functionParameterArityMismatch.js]
f1();
f1(1, 2);
f1(1, 2, 3, 4);
f2(1, 2);
f3(1);
f3(1, 2, 3);
f4(1);
f4(1, 2, 3);
f5(1, 2, 3);
f5(1, 2, 3, 4, 5, 6);
