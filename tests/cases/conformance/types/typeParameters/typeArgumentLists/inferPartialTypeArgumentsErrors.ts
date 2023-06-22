declare function testConstraints1<A extends B, B extends string>(arg?: { a?: A[], b?: B[] }): { a: A[], b: B[] }
const expectError1 = testConstraints1<_, "z"> ({ a: ["x", "y"] });

declare function testConstraints2<A extends string, B extends A>(arg?: { a?: A[], b?: B[] }): { a: A[], b: B[] }
const expectAllowed1 = testConstraints2<_, "x"> ({ a: ["x", "y"] }); // OK { a: string[], b: "x"[] }
const expectAllowed2 = testConstraints2<"x" | "y", _> ({ b: ["x"] }); // OK { a: ("x" | "y")[], b: ("x" | "y")[] }
const expectError2 = testConstraints2<_, "z"> ({ a: ["x", "y"] }); // error - `A` infers as `"x" | "y"` which `"z"` does not satisfy
const expectError3 = testConstraints2<"x" | "y", _> ({ b: ["x", "y", "z"] }); // error "z" not in "x" | "y"

declare function complexConstraints<A extends string, B extends A, C extends B>(arg: { a?: A[], b?: B[], c?: C[] }): { a: A[], b: B[], c: C[] };
const expectAllowed4 = complexConstraints<"x" | "y" | "z", _, _> ({ a: ["x"], c: ["x", "y"] }); // OK { a: ("x" | "y" | "z")[], b: ("x" | "y" | "z")[], c: ("x" | "y")[] }
// Fails because B inferred to be "x" but that conflicts with C as "x" | "y"
const expectError4 = complexConstraints<"x" | "y" | "z", _, "x" | "y">({b: ["x"]});
const expectError5 = complexConstraints<"x", _, _>({c: ["y"]}); // error "y" does not extend "x"
