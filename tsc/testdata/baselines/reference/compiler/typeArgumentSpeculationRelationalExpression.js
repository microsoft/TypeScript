//// [tests/cases/compiler/typeArgumentSpeculationRelationalExpression.ts] ////

//// [expressions.ts]
export {};
declare const a: any, b: any, c: any, d: any, e: any, B: any, options: any, x: any;
type T = any;
type U = string;
type X = number;
type Y = string;
declare function f<A = unknown, B = unknown>(...args: any[]): any;
declare function g<A>(...args: any[]): any;

// Typed, empty, and async arrows remain expressions.
a < ((x: T) => c > (d));
a < ((x: T) => c > d);
a < (() => c > (d));
a < (() => c > d);
a < (async (x: T) => c > (d));
a < (async (x: T) => c > d);

// Expression containers must be structurally complete before accepting type arguments.
a < [b > (c)];
a < [b > `c`];
a < b[c > (d)];
a < c[d > (e) ? 0 : 1];
a < {b: c > (d)};
a < new B > (c);
a < keyof [b > (c)];
a < import("m", options) > (c);

// Relational expressions must preserve the outer argument list (#60874).
console.log(a < b, (c > (d & e)));
console.log(a < b, (((c > (d & e)))));
f(a < b, [c > (d)]);
f(a < b, {c: d > (e)});
f(a < b, [g<T>(c > (d))]);

// Completed type arguments still take precedence over relational expressions.
f<T, (T)>(1);
f<(x: T) => T>(1);
f<() => T>(1);
f<((x: T) => T)>(1);
f<<T>(x: T) => (T)>(x);
f<{ [a < ((x: T) => c > (d))]: T }>();
f<{ [a < [b > (c)]]: T }>();
f<T[U]>();
f<[T, U]>();
f<{ x: T; m(x: T): U }>();
f<{ [K in keyof T]: T[K] }>();
f<new (x: T) => U>();
f<T extends U ? X : Y>();
f<import("m", { with: { type: "json" } })>();
f<`prefix${T}`>();
f<infer X extends (T)>();
f<infer X extends U ? X : never>();
f<{ /** @type {(T} @see x */ x: T }>();
f<() => T>`text`;
f<() => T>`text${1}`;
f<() => T>;

// Arrow and type-argument probes must rebuild computed names and defaults.
const probe = ({ [g<({ [x]: y }: T) => U>()]: z = g<T>() }: T) => z;

//// [expressions.tsx]
export {};
declare const a: any, b: any, c: any, d: any, e: any, B: any, options: any, x: any;
type T = any;
type U = string;
type X = number;
type Y = string;
declare function f<A = unknown, B = unknown>(...args: any[]): any;
declare function g<A>(...args: any[]): any;

// Typed, empty, and async arrows remain expressions.
a < ((x: T) => c > (d));
a < ((x: T) => c > d);
a < (() => c > (d));
a < (() => c > d);
a < (async (x: T) => c > (d));
a < (async (x: T) => c > d);

// Expression containers must be structurally complete before accepting type arguments.
a < [b > (c)];
a < [b > `c`];
a < b[c > (d)];
a < c[d > (e) ? 0 : 1];
a < {b: c > (d)};
a < new B > (c);
a < keyof [b > (c)];
a < import("m", options) > (c);

// Relational expressions must preserve the outer argument list (#60874).
console.log(a < b, (c > (d & e)));
console.log(a < b, (((c > (d & e)))));
f(a < b, [c > (d)]);
f(a < b, {c: d > (e)});
f(a < b, [g<T>(c > (d))]);

// Completed type arguments still take precedence over relational expressions.
f<T, (T)>(1);
f<(x: T) => T>(1);
f<() => T>(1);
f<((x: T) => T)>(1);
f<<T>(x: T) => (T)>(x);
f<{ [a < ((x: T) => c > (d))]: T }>();
f<{ [a < [b > (c)]]: T }>();
f<T[U]>();
f<[T, U]>();
f<{ x: T; m(x: T): U }>();
f<{ [K in keyof T]: T[K] }>();
f<new (x: T) => U>();
f<T extends U ? X : Y>();
f<import("m", { with: { type: "json" } })>();
f<`prefix${T}`>();
f<infer X extends (T)>();
f<infer X extends U ? X : never>();
f<{ /** @type {(T} @see x */ x: T }>();
f<() => T>`text`;
f<() => T>`text${1}`;
f<() => T>;

// Arrow and type-argument probes must rebuild computed names and defaults.
const probe = ({ [g<({ [x]: y }: T) => U>()]: z = g<T>() }: T) => z;


//// [expressions.js]
// Typed, empty, and async arrows remain expressions.
a < ((x) => c > (d));
a < ((x) => c > d);
a < (() => c > (d));
a < (() => c > d);
a < (async (x) => c > (d));
a < (async (x) => c > d);
// Expression containers must be structurally complete before accepting type arguments.
a < [b > (c)];
a < [b > `c`];
a < b[c > (d)];
a < c[d > (e) ? 0 : 1];
a < { b: c > (d) };
a < new B > (c);
a < keyof[b > (c)];
a < import("m", options) > (c);
// Relational expressions must preserve the outer argument list (#60874).
console.log(a < b, (c > (d & e)));
console.log(a < b, (((c > (d & e)))));
f(a < b, [c > (d)]);
f(a < b, { c: d > (e) });
f(a < b, [g(c > (d))]);
// Completed type arguments still take precedence over relational expressions.
f(1);
f(1);
f(1);
f(1);
f(x);
f();
f();
f();
f();
f();
f();
f();
f();
f();
f();
f();
f();
f();
f `text`;
f `text${1}`;
f;
// Arrow and type-argument probes must rebuild computed names and defaults.
const probe = ({ [g()]: z = g() }) => z;
export {};
//// [expressions.jsx]
// Typed, empty, and async arrows remain expressions.
a < ((x) => c > (d));
a < ((x) => c > d);
a < (() => c > (d));
a < (() => c > d);
a < (async (x) => c > (d));
a < (async (x) => c > d);
// Expression containers must be structurally complete before accepting type arguments.
a < [b > (c)];
a < [b > `c`];
a < b[c > (d)];
a < c[d > (e) ? 0 : 1];
a < { b: c > (d) };
a < new B > (c);
a < keyof[b > (c)];
a < import("m", options) > (c);
// Relational expressions must preserve the outer argument list (#60874).
console.log(a < b, (c > (d & e)));
console.log(a < b, (((c > (d & e)))));
f(a < b, [c > (d)]);
f(a < b, { c: d > (e) });
f(a < b, [g(c > (d))]);
// Completed type arguments still take precedence over relational expressions.
f(1);
f(1);
f(1);
f(1);
f(x);
f();
f();
f();
f();
f();
f();
f();
f();
f();
f();
f();
f();
f();
f `text`;
f `text${1}`;
f;
// Arrow and type-argument probes must rebuild computed names and defaults.
const probe = ({ [g()]: z = g() }) => z;
export {};
