// Test case to check the fix
declare function foo<T extends { dataType: 'a' | 'b' }>(template: T): [T, any, any];

// Error case - accessing last element 
const [, , last] = foo({ dataType: 'a', day: 0 });

// Working case - not accessing last element
const [, mid, ] = foo({ dataType: 'a', day: 0 });