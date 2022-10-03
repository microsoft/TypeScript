//// [nongenericConditionalNotPartiallyComputed.ts]
// Expected: type A = number
// Got: type A = number[] extends (infer T)[] ? T : never
type A = Array<number> extends Array<any> ? Array<number> extends Array<infer T> ? T : never : never

//// [nongenericConditionalNotPartiallyComputed.js]
