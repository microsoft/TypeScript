type DataType = 'a' | 'b';
declare function foo<T extends { dataType: DataType }>(template: T): [T, any, any];

// Test both cases
const [, , t] = foo({ dataType: 'a', day: 0 });
const [, s, ] = foo({ dataType: 'a', day: 0 });