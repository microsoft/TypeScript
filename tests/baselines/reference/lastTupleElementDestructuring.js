//// [tests/cases/compiler/lastTupleElementDestructuring.ts] ////

//// [lastTupleElementDestructuring.ts]
// Test for fixing excess property checking when accessing last tuple element in destructuring
// Fixes https://github.com/microsoft/TypeScript/issues/41548

declare function foo<T extends { dataType: 'a' | 'b' }>(template: T): [T, any, any];
declare function bar<T extends { dataType: 'a' | 'b' }>(template: T): [T, any, any, any];

// Cases that should NOT error after fix (accessing last element)
const [, , last1] = foo({ dataType: 'a', day: 0 });
const [,,last2] = foo({ dataType: 'a', day: 0 });
const [,,,last3] = bar({ dataType: 'a', day: 0 });

// Cases that already worked (not accessing last element)
const [, mid1, ] = foo({ dataType: 'a', day: 0 });
const [first1, , ] = foo({ dataType: 'a', day: 0 });
const [,,third,] = bar({ dataType: 'a', day: 0 });

// Legitimate errors should still be caught
const [, , last4] = foo({ dataType: 'c' }); // Error: 'c' not assignable to 'a' | 'b'
const [,,,last5] = bar({ notDataType: 'a' }); // Error: missing required property 'dataType'

// Test with more complex object properties
interface Config {
    required: string;
    optional?: number;
}

declare function withConfig<T extends Config>(template: T): [T, string];

// Should work - accessing last element with extra property
const [,configStr] = withConfig({ required: 'test', extra: 'should work' });

// Should still error - missing required property
const [,configStr2] = withConfig({ optional: 42 }); // Error: missing 'required'

//// [lastTupleElementDestructuring.js]
// Test for fixing excess property checking when accessing last tuple element in destructuring
// Fixes https://github.com/microsoft/TypeScript/issues/41548
// Cases that should NOT error after fix (accessing last element)
var _a = foo({ dataType: 'a', day: 0 }), last1 = _a[2];
var _b = foo({ dataType: 'a', day: 0 }), last2 = _b[2];
var _c = bar({ dataType: 'a', day: 0 }), last3 = _c[3];
// Cases that already worked (not accessing last element)
var _d = foo({ dataType: 'a', day: 0 }), mid1 = _d[1];
var _e = foo({ dataType: 'a', day: 0 }), first1 = _e[0];
var _f = bar({ dataType: 'a', day: 0 }), third = _f[2];
// Legitimate errors should still be caught
var _g = foo({ dataType: 'c' }), last4 = _g[2]; // Error: 'c' not assignable to 'a' | 'b'
var _h = bar({ notDataType: 'a' }), last5 = _h[3]; // Error: missing required property 'dataType'
// Should work - accessing last element with extra property
var _j = withConfig({ required: 'test', extra: 'should work' }), configStr = _j[1];
// Should still error - missing required property
var _k = withConfig({ optional: 42 }), configStr2 = _k[1]; // Error: missing 'required'
