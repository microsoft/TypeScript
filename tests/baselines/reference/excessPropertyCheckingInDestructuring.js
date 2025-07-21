//// [tests/cases/compiler/excessPropertyCheckingInDestructuring.ts] ////

//// [excessPropertyCheckingInDestructuring.ts]
declare function foo<T extends { dataType: 'a' | 'b' }>(template: T): [T, any, any];
declare function bar(template: { dataType: 'a' | 'b' }): [any, any, any];

// These should work without excess property errors - destructuring contexts
const [, ,] = foo({ dataType: 'a', day: 0 });
const [, , t] = foo({ dataType: 'a', day: 0 });
const [x, y, z] = foo({ dataType: 'a', day: 0 });

const [, ,] = bar({ dataType: 'a', day: 0 });
const [, , u] = bar({ dataType: 'a', day: 0 });
const [a, b, c] = bar({ dataType: 'a', day: 0 });

// These should still report legitimate type errors
const [, , invalid1] = foo({ dataType: 'invalid' });
const [, , invalid2] = bar({ dataType: 'invalid' });

// Non-destructuring cases - generic function should work, non-generic should error
const result1 = foo({ dataType: 'a', day: 0 }); // OK - generic function
const result2 = bar({ dataType: 'a', day: 0 }); // Error - non-generic with excess property

// Assignment destructuring should also work
let d, e, f: any;
[d, e, f] = foo({ dataType: 'a', day: 0 });

//// [excessPropertyCheckingInDestructuring.js]
"use strict";
var _a;
// These should work without excess property errors - destructuring contexts
var _b = foo({ dataType: 'a', day: 0 });
var _c = foo({ dataType: 'a', day: 0 }), t = _c[2];
var _d = foo({ dataType: 'a', day: 0 }), x = _d[0], y = _d[1], z = _d[2];
var _e = bar({ dataType: 'a', day: 0 });
var _f = bar({ dataType: 'a', day: 0 }), u = _f[2];
var _g = bar({ dataType: 'a', day: 0 }), a = _g[0], b = _g[1], c = _g[2];
// These should still report legitimate type errors
var _h = foo({ dataType: 'invalid' }), invalid1 = _h[2];
var _j = bar({ dataType: 'invalid' }), invalid2 = _j[2];
// Non-destructuring cases - generic function should work, non-generic should error
var result1 = foo({ dataType: 'a', day: 0 }); // OK - generic function
var result2 = bar({ dataType: 'a', day: 0 }); // Error - non-generic with excess property
// Assignment destructuring should also work
var d, e, f;
_a = foo({ dataType: 'a', day: 0 }), d = _a[0], e = _a[1], f = _a[2];
