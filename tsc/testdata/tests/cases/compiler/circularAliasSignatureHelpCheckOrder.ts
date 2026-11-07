// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated

// Signature help for the call resolves the circular aliases inside a request
// whose effects are discarded. Checking afterwards still reports both
// circularities (58068).

type A = B;
type B = A;
declare function f(x: A): void;
f(1);
