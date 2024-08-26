// @strict: true
declare function wrap<X>(x: X): { x: X };
declare function call<A extends unknown[], T>(x: { x: (...args: A) => T }, ...args: A): T;

// This should be of type `number` - ideally, it also would not error.
const leak = call(wrap(<T>(x: T) => x), 1);
