// @noEmit: true

// Instantiation limits must not depend on what was instantiated before.
// This holds for the depth limit, but not yet for the limit on the number
// of instantiations, which Wide2All only reaches if Wide2Tail was not
// checked first.

type D = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type K = `${D}${D}${D}`;

// Over five million instantiations for one statement.
type Wide<N extends 0[], I> = N["length"] extends 6 ? I : { [J in K]: Wide<[...N, 0], [J, I][0]> }[K];
type WideAll = Wide<[], "">;

// The same, but half of the instantiations already happened for another
// statement.
type Wide2<N extends 0[], I> = N["length"] extends 6 ? I : { [J in K]: Wide2<[...N, 0], [J, I][0]> }[K];
type Wide2Tail = Wide2<[0, 0, 0], "">;
type Wide2All = Wide2<[], "">;

// Over a hundred nested instantiations, half of which already happened for
// another statement.
type Deep<N extends 0[]> = N["length"] extends 60 ? never : Deep<[...N, 0]> | N["length"];
type DeepTail = Deep<[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]>;
type DeepAll = Deep<[]>;
