// @strict: true

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