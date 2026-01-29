//// [tests/cases/conformance/types/typeAliases/typeAliasesDoNotMerge.ts] ////

//// [typeAliasesDoNotMerge.ts]
export type A = {}
type A = {}


//// [typeAliasesDoNotMerge.js]
export {};
