//// [tests/cases/compiler/tupleComplexity.ts] ////

//// [tupleComplexity.ts]
// Tuple union with simple cases - should not produce TS2590
type TupleUnion = [string, number] | [boolean, string];
const example1: TupleUnion = ["hello", 42]; // Valid
const example2: TupleUnion = [true, "world"]; // Valid

// Complex tuple concatenation - TS2590 currently triggered
type ConcatTuple<T extends any[], U extends any[]> = [...T, ...U];
type Result = ConcatTuple<[number, string], [boolean]>;
// Result should be inferred as [number, string, boolean]
const concatenated: Result = [1, "foo", true]; // Valid

// Map types on tuples
type Stringify<T extends any[]> = { [K in keyof T]: string };
type Mapped = Stringify<[number, boolean]>;
// Should infer as [string, string]
const mapped: Mapped = ["123", "true"]; // Valid

// Complex unions within tuples
type NestedUnion = [string, [boolean | number]];
const nested: NestedUnion = ["test", [true]]; // Valid
const nested2: NestedUnion = ["test", [42]]; // Valid


//// [tupleComplexity.js]
var example1 = ["hello", 42]; // Valid
var example2 = [true, "world"]; // Valid
// Result should be inferred as [number, string, boolean]
var concatenated = [1, "foo", true]; // Valid
// Should infer as [string, string]
var mapped = ["123", "true"]; // Valid
var nested = ["test", [true]]; // Valid
var nested2 = ["test", [42]]; // Valid
