//// [tests/cases/compiler/contextualSigInstantiationRestParams.ts] ////

//// [contextualSigInstantiationRestParams.ts]
declare function toInstantiate<A, B>(a?: A, b?: B): B;
declare function contextual(...s: string[]): string

var sig: typeof contextual = toInstantiate;

//// [contextualSigInstantiationRestParams.js]
var sig = toInstantiate;
