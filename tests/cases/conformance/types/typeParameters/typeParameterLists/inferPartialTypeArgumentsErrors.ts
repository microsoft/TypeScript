// @strict: true
// @declaration: true

declare function testConstraints1<A extends string, preferinfer B extends A>(arg?: {
  a?: A[];
  b?: B[];
}): { a: A[]; b: B[] };
const expectError1 = testConstraints1<"z">({ b: ["x", "y"] });

declare function testConstraints2<A extends B, preferinfer B extends string>(arg?: {
  a?: A[];
  b?: B[];
}): { a: A[]; b: B[] };
const expectAllowed1 = testConstraints2<"x">({ b: ["x", "y"] });
const expectError2 = testConstraints2<"z">({ b: ["x", "y"] });

declare function testConstraints3<A extends string, preferinfer B extends A>(arg?: {
  a?: A[];
  b?: B[];
}): { a: A[]; b: B[] };
const expectAllowed3 = testConstraints3<"x" | "y">({ b: ["x"] });
const expectError3 = testConstraints3<"x" | "y">({ b: ["x", "y", "z"] });

declare function complexConstraints1<
  A extends string,
  preferinfer B extends A,
  preferinfer C extends B
>(arg: { a?: A[]; b?: B[]; c?: C[] }): { a: A[]; b: B[]; c: C[] };
const expectAllowed4 = complexConstraints1<"x" | "y" | "z">({
  a: ["x"],
  c: ["x", "y"],
});
const expectError5 = complexConstraints1<"x">({ c: ["y"] });

declare function complexConstraints2<
  A extends string,
  preferinfer B extends C,
  preferinfer C extends A
>(arg: { a?: A[]; b?: B[]; c?: C[] }): { a: A[]; b: B[]; c: C[] };
const expectError4 = complexConstraints2<"x" | "y" | "z", "x" | "y">({
  c: ["x"],
});
