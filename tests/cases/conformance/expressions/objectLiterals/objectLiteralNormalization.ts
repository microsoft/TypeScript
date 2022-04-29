// @strict: true
// @declaration: true

// Object literals in unions are normalized upon widening
let a1 = [{ a: 0 }, { a: 1, b: "x" }, { a: 2, b: "y", c: true }][0];
a1.a;  // number
a1.b;  // string | undefined
a1.c;  // boolean | undefined
a1 = { a: 1 };
a1 = { a: 0, b: 0 };  // Error
a1 = { b: "y" };  // Error
a1 = { c: true };  // Error

let a2 = [{ a: 1, b: 2 }, { a: "abc" }, {}][0];
a2.a;  // string | number | undefined
a2.b;  // number | undefined
a2 = { a: 10, b: 20 };
a2 = { a: "def" };
a2 = {};
a2 = { a: "def", b: 20 };  // Error
a2 = { a: 1 };  // Error

// Object literals containing spreads are not normalized
declare let b1: { a: string, b: string } | { b: string, c: string };
let b2 = { ...b1, z: 55 };
let b3 = { ...b2 };

// Before widening {} acts like { [x: string]: undefined }, which is a
// subtype of types with all optional properties
declare let opts: { foo?: string, bar?: string, baz?: boolean };
let c1 = !true ? {} : opts;
let c2 = !true ? opts : {};
let c3 = !true ? { a: 0, b: 0 } : {};
let c4 = !true ? {} : { a: 0, b: 0 };

// Normalization applies to nested properties
let d1 = [{ kind: 'a', pos: { x: 0, y: 0 } }, { kind: 'b', pos: !true ? { a: "x" } : { b: 0 } }][0];
d1.kind;
d1.pos;
d1.pos.x;
d1.pos.y;
d1.pos.a;
d1.pos.b;

declare function f<T>(...items: T[]): T;
declare let data: { a: 1, b: "abc", c: true };

// Object literals are inferred as a single normalized union type
let e1 = f({ a: 1, b: 2 }, { a: "abc" }, {});
let e2 = f({}, { a: "abc" }, { a: 1, b: 2 });
let e3 = f(data, { a: 2 });
let e4 = f({ a: 2 }, data);
