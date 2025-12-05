// @strict: true

// Test case for issue #62737: Show incompatible union members in discriminated union discriminator errors

type Discriminated =
  | { discriminator: "foo" }
  | { discriminator: "bar" };

type UnionType = "foo" | "bar" | "baz";

const obj = { discriminator: "foo" as UnionType };

// This error should identify "baz" as the problematic type, not "foo"
const err: Discriminated = obj;

// Additional test case with multiple incompatible members
type UnionType2 = "foo" | "bar" | "baz" | "qux";
const obj2 = { discriminator: "foo" as UnionType2 };
const err2: Discriminated = obj2;

// Test case with expected error (expectedError reference)
const expectedError: Discriminated = { discriminator: "foo" } as { discriminator: UnionType };

