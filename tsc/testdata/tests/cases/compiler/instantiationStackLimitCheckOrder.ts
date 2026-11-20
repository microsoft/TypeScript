// @noEmit: true
// @target: esnext
// @checkOrder: default, typesfirst

// F<[]> recurses forever, so instantiating it reaches the limit on the
// instantiation stack, wherever it is first instantiated. The instantiations
// in progress then fail as a whole, and none of them may be cached partly
// built for the other declaration to reuse.

type F<T> = T extends [unknown?, ...infer R] ? [0, ...F<R>] : [];
type X = F<[]>;

// The element type of A[] is resolved whenever first needed, inside the
// instantiation of the return type of flat or not. Reaching the limit while
// flattening it must fail the same instantiations either way.

type A = A[];
const r = ([] as A).flat(Infinity);
