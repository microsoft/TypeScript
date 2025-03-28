// Tests for TS2590: "Expression produces a union type that is too complex to represent"

// --- Tuple Unions ---

// Simple union - Should work
type TupleUnion1 = [string, number] | [boolean, string];
const valid1: TupleUnion1 = ["hello", 42]; // ✅ Should pass
const valid2: TupleUnion1 = [true, "world"]; // ✅ Should pass

// Extended union - Should trigger TS2590
type TupleUnion2 = [string, number] | [boolean, string];
type ComplexTuple = [...TupleUnion2, string]; // ❌ Should trigger TS2590
const invalid: ComplexTuple = ["hello", 42, "world"]; // Should fail with TS2590

// --- Tuple Concatenations ---

// Manageable concatenation - Should work
type ConcatTuple<T extends any[], U extends any[]> = [...T, ...U];
type Result1 = ConcatTuple<[string, number], [boolean]>; // ✅ Should infer [string, number, boolean]
const concat1: Result1 = ["hello", 42, true]; // ✅ Should pass

// Excessively large concatenation - Should trigger TS2590
type LargeConcat = ConcatTuple<[...Array<100>], [...Array<100>]>;
// ❌ Should trigger TS2590 for excessive complexity

// --- Mapped Types on Tuples ---

// Simple mapping - Should work
type Stringify<T extends any[]> = { [K in keyof T]: string };
type MappedTuple1 = Stringify<[number, boolean]>; // ✅ Should infer [string, string]
const map1: MappedTuple1 = ["42", "true"]; // ✅ Should pass

// --- Nested Tuples ---

// Deeply nested tuple - Should trigger TS2590
type DeepTuple = [string, [boolean | number, [boolean | number, [boolean | number]]]];
type Nested = [...DeepTuple, string]; // ❌ Should trigger TS2590
const deep: Nested = ["root", [true, [42, [false]]], "leaf"]; // Should fail with TS2590

// --- Invalid Cases ---

// Expected type mismatches (non-TS2590 failures)
const invalidConcat1: Result1 = ["hello", 42]; // ❌ Error: Missing boolean
const invalidMap1: MappedTuple1 = [42, true]; // ❌ Error: Expected strings
