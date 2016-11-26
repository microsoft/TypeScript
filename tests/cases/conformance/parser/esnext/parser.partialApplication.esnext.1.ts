// @target: esnext
// @noEmit: true
declare function f(a: number, b: number, ...c: number[]): void;
declare const o: { m(a: number, b: number, ...c: number[]): void; };
// positional elements
f(?, 0);
f(0, ?);
f(?, ?);
o.m(?, 0);
o.m(0, ?);
o.m(?, ?);
// ordinal positional elements
f(?0, 0);
f(0, ?0);
f(?0, ?1);
f(?1, ?0);
o.m(?0, 0);
o.m(0, ?0);
o.m(?0, ?1);
o.m(?1, ?0);
// positional spread element
f(0, 1, ...);
f(0, 1, ..., 2);
o.m(0, 1, ...);
o.m(0, 1, ..., 2);
// mixed
f(?, 0, ...);
f(0, ?, ...);
f(0, 1, ..., ?0);
o.m(?, 0, ...);
o.m(0, ?, ...);
o.m(0, 1, ..., ?0);