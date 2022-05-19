// @target: es6
// @strict: true
// repro from https://github.com/microsoft/TypeScript/issues/49000

type UnionOfObjs = { prop0: string } | { prop1: number; prop2: boolean } | { prop3: string[] };

type KeyOfUnion<T>   = T extends string | number ? keyof T : never;
type KeyOfUnknown<T> = T extends unknown ? keyof T : never;
type KeyOfObject<T>  = T extends object  ? keyof T : never;

type Working = { [K in KeyOfUnknown<UnionOfObjs>]: UnionOfObjs[K] };

// The case below should be equivalent to type `Working` above, however
// it was broken in the past and does not error
type Broken<T> = { [K in KeyOfUnknown<T>]: T[K] };
type Test = Broken<UnionOfObjs>

// Other cases
type Okay<T> = { [K in KeyOfObject<T>]: T[K] };

type NotOkay<T> = { [K in KeyOfUnion<T>]: T[K] };