// @strict: *
// @checkJS: true
// @allowJS: true
// @noEmit: true
// @filename: defs.d.ts
declare function f1(p: void): void;
declare function f2(p: undefined): void;
declare function f3(p: unknown): void;
declare function f4(p: any): void;

interface I<T> { m(p: T): void; }
declare const o1: I<void>;
declare const o2: I<undefined>;
declare const o3: I<unknown>;
declare const o4: I<any>;

// @filename: jsfile.js
// current behavior: treat trailing `void` as optional
f1();
o1.m();

// new behavior: treat 'undefined', 'unknown', and 'any' as optional in non-strict mode
f2();
f3();
f4();

o2.m();
o3.m();
o4.m();

// @filename: tsfile.ts
// current behavior: treat trailing `void` as optional
f1();
o1.m();

// no change in behavior
f2();
f3();
f4();

o2.m();
o3.m();
o4.m();
