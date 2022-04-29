//// [recursiveResolveTypeMembers.ts]
// Repro from #25291

type PromisedTuple<L extends any[], U = (...args: L) => void> =
    U extends (h: infer H, ...args: infer R) => [Promise<H>, ...PromisedTuple<R>] ? [] : []

type Promised = PromisedTuple<[1, 2, 3]> 


//// [recursiveResolveTypeMembers.js]
// Repro from #25291
