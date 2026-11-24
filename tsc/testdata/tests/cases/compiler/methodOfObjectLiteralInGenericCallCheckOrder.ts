// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst

// Inference for Object.fromEntries goes through a generic call with an
// object literal method, and gives the same result whether or not the
// editor asked about the call first (43948).

const id = <T,>(x: T): T => x;

const keys: string[] = [];

const result = Object.fromEntries(keys.map(k => [
    k,
    id({ test() { } }),
]));
