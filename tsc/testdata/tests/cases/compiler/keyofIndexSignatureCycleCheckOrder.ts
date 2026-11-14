// @noEmit: true
// @checkOrder: default, typesfirst

// S and the index signature of C depend on each other. Resolving the members
// of C first gives S from the part of them available so far, and resolving S
// first must give the same result rather than fail it as circular.

interface C { [k: string]: S; }
type S = keyof C;
const k: S = 123;
