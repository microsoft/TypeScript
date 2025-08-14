// @strict: true

type DataType = 'a' | 'b';
declare function foo<T extends { dataType: DataType }>(template: T): [T, any, any];

// These should behave the same - both should allow excess properties
const [, , t] = foo({ dataType: 'a', day: 0 });
const [, s, ] = foo({ dataType: 'a', day: 0 });