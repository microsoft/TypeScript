//// [tests/cases/compiler/discriminatedUnionIncompatibleMemberErrorMessage.ts] ////

//// [discriminatedUnionIncompatibleMemberErrorMessage.ts]
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



//// [discriminatedUnionIncompatibleMemberErrorMessage.js]
"use strict";
// Test case for issue #62737
// Improve error messages when assigning objects with wider discriminator unions to discriminated union types
var obj = { discriminator: "foo" };
var err = obj; // Error: "baz" is not present in discriminator
var obj2 = { discriminator: "foo" };
var err2 = obj2; // Error: "baz" | "qux" are not present in discriminator
var shape = { kind: "circle" };
var err3 = shape; // Error: "triangle" is not present in discriminator "kind"
var unexpectedError = { discriminator: "foo" };
