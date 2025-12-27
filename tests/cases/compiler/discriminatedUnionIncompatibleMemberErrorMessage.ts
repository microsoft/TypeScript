// @strict: true

// Test case for issue #62737
// Improve error messages when assigning objects with wider discriminator unions to discriminated union types

// Basic case - single incompatible type
type Discriminated =
  | { discriminator: "foo" }
  | { discriminator: "bar" };

type UnionType = "foo" | "bar" | "baz";

const obj = { discriminator: "foo" as UnionType };
const err: Discriminated = obj; // Error: "baz" is not present in discriminator

// Multiple incompatible types
type WiderUnion = "foo" | "bar" | "baz" | "qux";
const obj2 = { discriminator: "foo" as WiderUnion };
const err2: Discriminated = obj2; // Error: "baz" | "qux" are not present in discriminator

// Different discriminator property name
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

type ShapeKind = "circle" | "square" | "triangle";
const shape = { kind: "circle" as ShapeKind };
const err3: Shape = shape; // Error: "triangle" is not present in discriminator "kind"

// From issue #62603
type Discriminated2 =
  | { discriminator: "foo" }
  | { discriminator: "bar" };

const unexpectedError: Discriminated2 = { discriminator: "foo" } as { discriminator: UnionType };

