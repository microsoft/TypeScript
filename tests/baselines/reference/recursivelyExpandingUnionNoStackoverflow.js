//// [recursivelyExpandingUnionNoStackoverflow.ts]
type N<T, K extends string> = T | { [P in K]: N<T, K> }[K];

type M = N<number, "M">;

//// [recursivelyExpandingUnionNoStackoverflow.js]
