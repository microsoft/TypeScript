// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated

// Spreading a union of an object type and `undefined` synthesizes an anonymous
// object type with optional properties and interns it by the object type and
// readonly flag, so checking the same spread expression in context-free and
// normal modes yields the same type in every check order.

interface Pair<A, B> { a: A; b: B }
declare const u: { a: number } | undefined;
declare const cond: boolean;

let x;
const arr = [];
arr.push(x = { ...u });

declare const a: Pair<(typeof arr)[number], 1>;
declare const b: Pair<typeof x, 2>;
const z = cond ? a : b;
