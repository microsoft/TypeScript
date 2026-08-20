// Proposal: microsoft/TypeScript#46135 — two attribute-keyed ambient modules
// with different attribute sets must stay distinct even when a naive
// serialization would collide. `{ a: "b,c=d" }` and `{ a: "b", c: "d" }` must not
// merge into a single module symbol.

// @module: esnext
// @moduleResolution: bundler
// @target: esnext
// @strict: true
// @noEmit: true

// @filename: /ambient.d.ts
declare module "*" with { a: "b,c=d" } {
    const one: "one";
    export default one;
}
declare module "*" with { a: "b", c: "d" } {
    const two: "two";
    export default two;
}

// @filename: /main.ts
import x from "./x.asset" with { a: "b,c=d" };
const isOne: "one" = x;

import y from "./y.asset" with { a: "b", c: "d" };
const isTwo: "two" = y;
