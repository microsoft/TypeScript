// @strict: true
// @target: esnext
// @noEmit: true

type NonString<T extends not string> = T;
type NonA<T extends not "a"> = T;
type NonKindA<T extends not { kind: "a" }> = T;
type NonLengthOne<T extends not { length: 1 }> = T;
type NonUndefined<T extends not undefined> = T;
type NonZero<T extends not 0> = T;

// A false subtype check does not imply disjointness, even when distributive.
type Unconstrained<T> = T extends string ? never : NonString<T>;
type BroadString<T extends string> = T extends "a" ? never : NonA<T>;
type Structural<T extends { kind: "a" | "b" }> =
    T extends { kind: "a" } ? never : NonKindA<T>;
type PrimitiveStructure<T extends string | number> =
    T extends { length: 1 } ? never : NonLengthOne<T>;

const unknownString: Unconstrained<unknown> = "a";
const broadString: BroadString<string> = "a";
const structural: Structural<{ kind: "a" | "b" }> = { kind: "a" };
const primitiveStructure: PrimitiveStructure<string> = "a";

// Even a discriminated-union constraint admits a single object with a union property.
type Tagged = { kind: "a" } | { kind: "b" };
type Discriminated<T extends Tagged> = T extends { kind: "a" } ? never : NonKindA<T>;
const discriminated: Discriminated<{ kind: "a" | "b" }> = { kind: "a" };

// Non-distributive checks retain the entire union, including matching members.
type NonDistributive<T extends string | number> =
    [T] extends [string] ? never : NonString<T>;
type NestedTuple<T extends string | number> =
    [[T]] extends [[string]] ? never : NonString<T>;
type ParenthesizedTuple<T extends string | number> =
    ([T]) extends ([string]) ? never : NonString<T>;
const nonDistributiveString: NonDistributive<string | number> = "a";
const nonDistributiveNumber: NonDistributive<string | number> = 1;
const nestedTuple: NestedTuple<string | number> = "a";
const parenthesizedTuple: ParenthesizedTuple<string | number> = "a";
type NoInferCheck<T extends string | number> =
    NoInfer<T> extends string ? never : NonString<T>;
const noInferCheck: NoInferCheck<string | number> = "a";

// False-branch infer parameters are out of scope; their upper bounds need not be exact matches.
type WithInfer<T extends string | number> =
    T extends infer U extends string ? U : NonString<T>;
type StructuralInfer<T extends Tagged> =
    T extends { kind: infer K extends "a" } ? K : NonKindA<T>;
type NonDistributiveInfer<T extends string | number> =
    [T] extends [infer U extends string] ? U : NonString<T>;
const withInfer: WithInfer<string | number> = 1;
const structuralInfer: StructuralInfer<{ kind: "a" | "b" }> = { kind: "a" };
const nonDistributiveInfer: NonDistributiveInfer<string | number> = "a";

// A generic extends type may select only part of a primitive domain.
type GenericTarget<T extends string | number, U extends string> =
    T extends U ? never : NonString<T>;
const genericTarget: GenericTarget<string, "a"> = "a";

// Unknown and structural supertypes can overlap strings without being string subtypes.
type TopConstraint<T extends {}> = T extends string ? never : NonString<T>;
type ObjectConstraint<T extends { length: number }> = T extends string ? never : NonString<T>;
const topConstraint: TopConstraint<{}> = "a";
const objectConstraint: ObjectConstraint<{ length: number }> = "a";

// Void also overlaps undefined without extending it.
type VoidConstraint<T extends void> = T extends undefined ? never : NonUndefined<T>;
const voidConstraint: VoidConstraint<void> = undefined;

// Numeric enum constraints admit broad number types, not just their literal members.
enum Numeric {
    A,
    B,
}
type EnumConstraint<T extends Numeric> = T extends 0 ? never : NonZero<T>;
const enumConstraint: EnumConstraint<number> = 0;
