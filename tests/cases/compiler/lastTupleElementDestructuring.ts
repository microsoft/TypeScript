// Test for fixing excess property checking when accessing last tuple element in destructuring
declare function foo<T extends { dataType: 'a' | 'b' }>(template: T): [T, any, any];

// This should NOT error after fix
const [, , last] = foo({ dataType: 'a', day: 0 });

// This already works (doesn't access last element) 
const [, mid, ] = foo({ dataType: 'a', day: 0 });

// Also test that legitimate errors are still caught
const [, , last2] = foo({ dataType: 'c' }); // Should still error