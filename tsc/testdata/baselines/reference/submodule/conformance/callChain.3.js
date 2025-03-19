//// [tests/cases/conformance/expressions/optionalChaining/callChain/callChain.3.ts] ////

//// [callChain.3.ts]
declare function absorb<T>(): T;
declare const a: { m?<T>(obj: {x: T}): T } | undefined;
const n1: number = a?.m?.({x: 12 }); // should be an error (`undefined` is not assignable to `number`)
const n2: number = a?.m?.({x: absorb()}); // likewise
const n3: number | undefined = a?.m?.({x: 12}); // should be ok
const n4: number | undefined = a?.m?.({x: absorb()}); // likewise

// Also a test showing `!` vs `?` for good measure
let t1 = a?.m?.({x: 12});
t1 = a!.m!({x: 12});

//// [callChain.3.js]
const n1 = a?.m?.({ x: 12 }); // should be an error (`undefined` is not assignable to `number`)
const n2 = a?.m?.({ x: absorb() }); // likewise
const n3 = a?.m?.({ x: 12 }); // should be ok
const n4 = a?.m?.({ x: absorb() }); // likewise
// Also a test showing `!` vs `?` for good measure
let t1 = a?.m?.({ x: 12 });
t1 = a.m({ x: 12 });
