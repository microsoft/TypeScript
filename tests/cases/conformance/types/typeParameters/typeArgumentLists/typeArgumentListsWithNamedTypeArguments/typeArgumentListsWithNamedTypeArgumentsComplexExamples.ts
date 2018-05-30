declare function testNamingOtherParameters<A = any, B = any>(arg: { a?: A, b?: B }): { a: A, b: B };
const assumingNotAllowed = testNamingOtherParameters<B = A>({ a: "test" }); // Error, cannot find `A`

declare function stillDefaultsIfNoInference<X, A = string, B= number, C=boolean>(arg: { a?: A, b?: B, c?: C, x?: X}): { a: A, b: B, c: C, x: X };
const result1 = stillDefaultsIfNoInference<C = object> ({ b: "test" }); // expect result1 type is {a: string, b: string, c: object, x: {}}

declare function testConstraints1<A extends B, B extends string>(arg?: { a?: A[], b?: B[] }): { a: A[], b: B[] }
const expectError1 = testConstraints1<B = "z"> ({ a: ["x", "y"] });

declare function testConstraints2<A extends string, B extends A>(arg?: { a?: A[], b?: B[] }): { a: A[], b: B[] }
const expectAllowed1 = testConstraints2<B = "x"> ({ a: ["x", "y"] }); // OK { a: string[], b: "x"[] }
const expectAllowed2 = testConstraints2<A = "x" | "y"> ({ b: ["x"] }); // OK { a: ("x" | "y")[], b: ("x" | "y")[] }
const expectAllowed3 = testConstraints2<B = "z"> ({ a: ["x", "y"] }); // OK - inference fails, but that just makes A = string, whcih still passes
const expectError2 = testConstraints2<A = "x" | "y"> ({ b: ["x", "y", "z"] }); // error "z" not in "x" | "y"

declare function complexConstraints<A extends string, B extends A, C extends B>(arg: { a?: A[], b?: B[], c?: C[] }): { a: A[], b: B[], c: C[] };
const expectAllowed4 = complexConstraints<A = "x" | "y" | "z"> ({ a: ["x"], c: ["x", "y"] }); // OK { a: ("x" | "y" | "z")[], b: ("x" | "y" | "z")[], c: ("x" | "y")[] }

// OK because B inferred to be "x" but that conflicts with C as "x" | "y" so inference fails - A and C are provided,
// B becomes its constraint, A, or "x" | "y" | "z", and the call successfully resolves
const expectAlllowed5 = complexConstraints<A = "x" | "y" | "z", C = "x" | "y">({b: ["x"]});
const expectError3 = complexConstraints<A = "x">({c: ["y"]}); // error "y" does not extend "x"

type ExampleDefaults<T = any, U = any, V extends string = string> = { t: T, u: U, v: V };
type ShouldBeAllowed<S extends string, V extends S = S> = ExampleDefaults<U = string, V = V>;

type NoInferenceReturnPosition<F extends (...args: any[]) => R, R = any> = R;
const expectAllowed6: NoInferenceReturnPosition<F = () => string> = "test"; // R defaults to any, so this is fine
const expectAllowed7: NoInferenceReturnPosition<F = () => string> = 35; // As is this

type InferredReturnType2<R, F extends (...args: any[]) => R = any> = R;
const expectError4: InferredReturnType2<F = () => string> = "test"; // Didn't fulfill R, issues error
