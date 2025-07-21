//// [tests/cases/compiler/excessPropertyCheckingInArrayDestructuring.ts] ////

//// [excessPropertyCheckingInArrayDestructuring.ts]
declare function foo<T extends { dataType: 'a' | 'b' }>(template: T): [T, any, any];

// Test the specific problematic case that should now work
const [, , works1] = foo({ dataType: 'a', day: 0 });
const [, , works2] = foo({ dataType: 'b', extra: 'value' });

// Test assignment destructuring (not currently fixed)
let a: any;
[, , a] = foo({ dataType: 'a', day: 0 }); // This might still error

// Test that legitimate errors are still caught
const [, , fails1] = foo({ dataType: 'c' }); // Error: 'c' not assignable to 'a' | 'b'
const [, , fails2] = foo(123); // Error: number not assignable to constraint

// Test that non-destructuring cases work as before
const result = foo({ dataType: 'a', day: 0 }); // Should work
const explicit: [{ dataType: 'a', day: number }, any, any] = foo({ dataType: 'a', day: 0 }); // Should work

// Test that other destructuring patterns work correctly
const [first] = foo({ dataType: 'a', day: 0 }); // Should work
const [, second] = foo({ dataType: 'a', day: 0 }); // Should work

//// [excessPropertyCheckingInArrayDestructuring.js]
"use strict";
var _a;
// Test the specific problematic case that should now work
var _b = foo({ dataType: 'a', day: 0 }), works1 = _b[2];
var _c = foo({ dataType: 'b', extra: 'value' }), works2 = _c[2];
// Test assignment destructuring (not currently fixed)
var a;
_a = foo({ dataType: 'a', day: 0 }), a = _a[2]; // This might still error
// Test that legitimate errors are still caught
var _d = foo({ dataType: 'c' }), fails1 = _d[2]; // Error: 'c' not assignable to 'a' | 'b'
var _e = foo(123), fails2 = _e[2]; // Error: number not assignable to constraint
// Test that non-destructuring cases work as before
var result = foo({ dataType: 'a', day: 0 }); // Should work
var explicit = foo({ dataType: 'a', day: 0 }); // Should work
// Test that other destructuring patterns work correctly
var first = foo({ dataType: 'a', day: 0 })[0]; // Should work
var _f = foo({ dataType: 'a', day: 0 }), second = _f[1]; // Should work
