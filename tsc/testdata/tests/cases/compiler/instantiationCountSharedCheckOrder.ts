// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst

// Instantiating Wide<[], "a"> fresh takes over five million instantiations,
// which is too many. In program order Rest has already done all but about
// two million of them. Whether All takes too many must not depend on which
// comes first.

type D = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type K = `${D}${D}${D}`;
type Wide<N extends 0[], I, J = never> = N["length"] extends 6 ? [I, J] : { [J2 in K]: Wide<[...N, 0], I, J2> }[K];
type Rest = Wide<[0, 0], "a">;
type All = Wide<[], "a">;
