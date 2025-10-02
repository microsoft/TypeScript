//// [tests/cases/compiler/nestedGenericSpreadInference.ts] ////

//// [nestedGenericSpreadInference.ts]
declare function wrap<X>(x: X): { x: X };
declare function call<A extends unknown[], T>(x: { x: (...args: A) => T }, ...args: A): T;

const leak = call(wrap(<T>(x: T) => x), 1);


//// [nestedGenericSpreadInference.js]
const leak = call(wrap((x) => x), 1);
