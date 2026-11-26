// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated

// Tests that a relation cycle compared again from its least member keeps its
// guard while nested comparisons take relaters from the pool.
//
// Under the strict subtype relation, N4 -> G4 holds when N2 -> T2 fails and
// N1 -> G1 holds when N0 -> T0 fails (strict arity rejects an optional
// parameter whose type relates to the required one). N3 -> T3 holds when
// N4 -> G4 and N1 -> G1 hold; N2 -> T2 and N0 -> T0 hold when N3 -> T3 holds.
// Entered at N3 -> T3, the cycle restarts from N2 -> T2 and computes N3 -> T3
// again, which reaches N0 -> T0. Comparing N0 -> T0 resolves typeof functions,
// whose subtype reduction restarts a cycle of its own on relaters from the pool.
declare let a1: { a: N3; b: string }, a2: { a: T3 };
let a = [a1, a2];

type N3 = { b: N4; c: N1 };
type T3 = { b: G4; c: G1 };
type N2 = { a: N3 };
type T2 = { a: T3 };
type N0 = { l: typeof functions; a: N3 };
type T0 = { l: typeof functions; a: T3 };
type N4 = (x?: N2 | T2) => 1;
type G4 = (x: T2 | undefined, y: unknown) => number;
type N1 = (x?: N0 | T0) => 1;
type G1 = (x: T0 | undefined, y: unknown) => number;

type P = { f: F | G };
type Q = { f: G };
type F = (x?: P) => 1;
type G = (x: Q | undefined) => number;
declare let f: F, g: G;
let functions = [f, g];
