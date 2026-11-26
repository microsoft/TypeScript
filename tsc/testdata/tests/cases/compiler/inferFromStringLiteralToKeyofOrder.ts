// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated

// Inferring from a string literal or `string` to `keyof T` synthesizes an
// anonymous object type for `T` and interns it by the key type, so repeated
// inferences from the same key type produce the same type and union ordering
// proceeds to subsequent type arguments in every check order.

interface Pair<A, B> { a: A; b: B }
declare function f<T, const U>(k: keyof T, u: U): Pair<T, U>;
declare const cond: boolean;

const x = f("a", 1);
const y = f("a", 2);
const z = cond ? x : y;

const u = f("" as string, 1);
const v = f("" as string, 2);
const w = cond ? u : v;
