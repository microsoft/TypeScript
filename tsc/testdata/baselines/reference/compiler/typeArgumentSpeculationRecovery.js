//// [tests/cases/compiler/typeArgumentSpeculationRecovery.ts] ////

//// [recovery.ts]
export {};
declare const a: any, b: any, c: any, d: any, e: any, B: any, options: any, x: any;
type T = any;
type U = string;
type X = number;
type Y = string;
declare function f<A = unknown, B = unknown>(...args: any[]): any;
declare function g<A>(...args: any[]): any;

// Recovery and rollback preserve diagnostics and the following call.
f<a,,b>();
g<(T)>();

f<?>;
g<(T)>();

f<"\xZ">();
g<(T)>();

f<010>();
g<(T)>();

f<("\xZ")>();
g<(T)>();

f<(010)>();
g<(T)>();

f<((x: T) => "\xZ")>();
g<(T)>();

f<import("m", { assert: { type: "json" } })>();
g<(T)>();

f<("\xZ" > (x));
g<(T)>();

f<T extends U X : Y>();
g<(T)>();

f<T extends U ? X Y>();
g<(T)>();

f<T | () => U>();
g<(T)>();

f<() => >();
g<(T)>();

f<T.>();
g<(T)>();

f<{ [(() => { type Bad = (T; return key; })()]: U }>();
g<(T)>();

//// [recovery.tsx]
export {};
declare const a: any, b: any, c: any, d: any, e: any, B: any, options: any, x: any;
type T = any;
type U = string;
type X = number;
type Y = string;
declare function f<A = unknown, B = unknown>(...args: any[]): any;
declare function g<A>(...args: any[]): any;

// Recovery and rollback preserve diagnostics and the following call.
f<a,,b>();
g<(T)>();

f<?>;
g<(T)>();

f<"\xZ">();
g<(T)>();

f<010>();
g<(T)>();

f<("\xZ")>();
g<(T)>();

f<(010)>();
g<(T)>();

f<((x: T) => "\xZ")>();
g<(T)>();

f<import("m", { assert: { type: "json" } })>();
g<(T)>();

f<("\xZ" > (x));
g<(T)>();

f<T extends U X : Y>();
g<(T)>();

f<T extends U ? X Y>();
g<(T)>();

f<T | () => U>();
g<(T)>();

f<() => >();
g<(T)>();

f<T.>();
g<(T)>();

f<{ [(() => { type Bad = (T; return key; })()]: U }>();
g<(T)>();


//// [recovery.js]
// Recovery and rollback preserve diagnostics and the following call.
f();
g();
f;
g();
f();
g();
f();
g();
f();
g();
f();
g();
f();
g();
f();
g();
f < ("\xZ" > (x));
g();
f();
g();
f();
g();
f();
g();
f();
g();
f();
g();
f();
g();
export {};
//// [recovery.jsx]
// Recovery and rollback preserve diagnostics and the following call.
f();
g();
f;
g();
f();
g();
f();
g();
f();
g();
f();
g();
f();
g();
f();
g();
f < ("\xZ" > (x));
g();
f();
g();
f();
g();
f();
g();
f();
g();
f();
g();
f();
g();
export {};
