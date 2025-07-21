// @strict: true

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