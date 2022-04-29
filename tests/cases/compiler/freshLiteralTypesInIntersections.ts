// @strict: true

// Repro from #19657

declare function func<A extends string, B extends A>(a: A, b: B[]): (ab: A & B) => void;
const q = func("x" as "x" | "y", ["x"]);
q("x");
