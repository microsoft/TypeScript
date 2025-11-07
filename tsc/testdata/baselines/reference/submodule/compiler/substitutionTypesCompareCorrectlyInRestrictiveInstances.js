//// [tests/cases/compiler/substitutionTypesCompareCorrectlyInRestrictiveInstances.ts] ////

//// [substitutionTypesCompareCorrectlyInRestrictiveInstances.ts]
type UnionKeys<T> = T extends any ? keyof T : never;
type BugHelper<T, TAll> = T extends any ? Exclude<UnionKeys<TAll>, keyof T> : never
type Bug<TAll> =  BugHelper<TAll, TAll>
type Q = UnionKeys<{ a : any } | { b: any }>    // should be "a" | "b"
type R = Bug<{ a : any } | { b: any }>          // should be "a" | "b"


//// [substitutionTypesCompareCorrectlyInRestrictiveInstances.js]
"use strict";
