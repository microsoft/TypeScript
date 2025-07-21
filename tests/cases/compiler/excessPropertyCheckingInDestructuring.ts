// @strict: true

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