//// [tests/cases/compiler/excessPropertyCheckingInArrayDestructuring.ts] ////

//// [excessPropertyCheckingInArrayDestructuring.ts]
declare function foo<T extends { dataType: 'a' | 'b' }>(template: T): [T, any, any];
declare function bar<T extends { dataType: 'a' | 'b' }>(template: T): [any, T, any];

// Test cases that should work (no excess property errors)
const [, works1] = foo({ dataType: 'a', day: 0 });
const [, , works2] = foo({ dataType: 'a', day: 0 });
const [, , , works3] = foo({ dataType: 'a', day: 0 });

// Test with different function signatures
const [, , works4] = bar({ dataType: 'b', extra: 'value' });

// Test assignment destructuring
let a: any, b: any, c: any;
[, , a] = foo({ dataType: 'a', day: 0 });
[, b, ] = foo({ dataType: 'a', day: 0 });

// Test that legitimate errors are still caught
const [, , fails1] = foo({ dataType: 'c' }); // Error: 'c' not assignable to 'a' | 'b'
const [, , fails2] = foo(123); // Error: number not assignable to constraint

// Test that non-destructuring cases work as before
const result = foo({ dataType: 'a', day: 0 }); // Should work
const explicit: [{ dataType: 'a', day: number }, any, any] = foo({ dataType: 'a', day: 0 }); // Should work

//// [excessPropertyCheckingInArrayDestructuring.js]
"use strict";
var _a, _b;
// Test cases that should work (no excess property errors)
var _c = foo({ dataType: 'a', day: 0 }), works1 = _c[1];
var _d = foo({ dataType: 'a', day: 0 }), works2 = _d[2];
var _e = foo({ dataType: 'a', day: 0 }), works3 = _e[3];
// Test with different function signatures
var _f = bar({ dataType: 'b', extra: 'value' }), works4 = _f[2];
// Test assignment destructuring
var a, b, c;
_a = foo({ dataType: 'a', day: 0 }), a = _a[2];
_b = foo({ dataType: 'a', day: 0 }), b = _b[1];
// Test that legitimate errors are still caught
var _g = foo({ dataType: 'c' }), fails1 = _g[2]; // Error: 'c' not assignable to 'a' | 'b'
var _h = foo(123), fails2 = _h[2]; // Error: number not assignable to constraint
// Test that non-destructuring cases work as before
var result = foo({ dataType: 'a', day: 0 }); // Should work
var explicit = foo({ dataType: 'a', day: 0 }); // Should work
