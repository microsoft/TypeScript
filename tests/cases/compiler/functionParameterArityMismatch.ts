declare function f1(a: number);
declare function f1(a: number, b: number, c: number);
f1();
f1(1, 2);
f1(1, 2, 3, 4);

declare function f2();
declare function f2(a: number, b: number);
declare function f2(a: number, b: number, c: number, d: number);
declare function f2(a: number, b: number, c: number, d: number, e: number, f: number);
f2(1);
f2(1, 2, 3);
f2(1, 2, 3, 4, 5);
f2(1, 2, 3, 4, 5, 6, 7);
f2(1, 2, 3, 4, 5, ...[6, 7]);
