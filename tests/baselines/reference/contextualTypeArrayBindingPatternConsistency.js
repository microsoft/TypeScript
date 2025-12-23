//// [tests/cases/compiler/contextualTypeArrayBindingPatternConsistency.ts] ////

//// [contextualTypeArrayBindingPatternConsistency.ts]
type DataType = 'a' | 'b';
declare function foo<T extends { dataType: DataType }>(template: T): [T, any, any];

// These should behave identically since they call the same function with the same argument
// but use different destructuring patterns

// Pattern 1: [, , t] - should not have excess property error  
const [, , t1] = foo({ dataType: 'a', day: 0 });

// Pattern 2: [, s, ] - should not have excess property error
const [, s1, ] = foo({ dataType: 'a', day: 0 });

// Both patterns should allow the excess property because they produce consistent contextual types
// that don't interfere with generic type inference

// Additional test cases to ensure the fix is general
const [, s2, ] = foo({ dataType: 'b', extra: 'test' }); // [, s, ] pattern with different property  
const [, , s3] = foo({ dataType: 'a', another: 1 });    // [, , s] pattern

//// [contextualTypeArrayBindingPatternConsistency.js]
"use strict";
// These should behave identically since they call the same function with the same argument
// but use different destructuring patterns
// Pattern 1: [, , t] - should not have excess property error  
var _a = foo({ dataType: 'a', day: 0 }), t1 = _a[2];
// Pattern 2: [, s, ] - should not have excess property error
var _b = foo({ dataType: 'a', day: 0 }), s1 = _b[1];
// Both patterns should allow the excess property because they produce consistent contextual types
// that don't interfere with generic type inference
// Additional test cases to ensure the fix is general
var _c = foo({ dataType: 'b', extra: 'test' }), s2 = _c[1]; // [, s, ] pattern with different property  
var _d = foo({ dataType: 'a', another: 1 }), s3 = _d[2]; // [, , s] pattern
