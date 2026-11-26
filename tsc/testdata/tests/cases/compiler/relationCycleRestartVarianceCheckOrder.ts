// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated

// Tests a relation cycle compared again from its least member while a
// superseded variance measurement is in progress.
//
// Measuring the variances of B measures those of A, which reaches B again;
// A sorts before B, so the measurement of B is superseded. Measuring A then
// resolves typeof functions, whose subtype reduction enters the cycle
// F -> G, P | undefined -> Q | undefined, P -> Q at a member other than its
// smallest one and restarts from F -> G with a relater of its own.
declare let b1: B<string>, b2: B<number>;
b1 = b2;

type P = { f: F | G };
type Q = { f: G };
type F = (x?: P) => 1;
type G = (x: Q | undefined) => number;
declare let f: F, g: G;
let functions = [f, g];

interface A<T> { v: B<T>; c: typeof functions; t: T }
interface B<T> { a: A<T>; t: T }
