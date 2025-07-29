// @strict: true

type DataType = 'a' | 'b';
declare function foo<T extends { dataType: DataType }>(template: T): [T, any, any];

// These should behave the same - both should allow excess properties

// This has an excess property error (should not)
const [, , t] = foo({ dataType: 'a', day: 0 });

// But this does not (correctly allows excess properties)  
const [, s, ] = foo({ dataType: 'a', day: 0 });

// Additional test cases to verify the fix
const [x, y, z] = foo({ dataType: 'a', day: 0 }); // All named - should work
const [, ,] = foo({ dataType: 'a', day: 0 }); // All anonymous - should work
const [a, , c] = foo({ dataType: 'a', day: 0 }); // Mixed - should work