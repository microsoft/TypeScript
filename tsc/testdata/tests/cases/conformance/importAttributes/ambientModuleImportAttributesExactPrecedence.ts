// Proposal: microsoft/TypeScript#46135 — precedence between attribute-keyed
// ambient modules and other declarations of the same specifier.
//
// - An attributed import consults attribute-keyed ambients before the plain
//   ambient module, so `declare module "pkg" with { type: "text" }` wins over a
//   plain `declare module "pkg"` for an import that carries `type: "text"`.
// - An exact attribute-keyed specifier is the most specific match, so it wins
//   over a wildcard attribute-keyed declaration.
// - An import with no matching attributes still falls through to the plain
//   ambient module.

// @module: esnext
// @moduleResolution: bundler
// @target: esnext
// @strict: true
// @noEmit: true

// @filename: /ambient.d.ts
declare module "pkg" {
    const plain: { plain: true };
    export default plain;
}
declare module "pkg" with { type: "text" } {
    const exact: "exact";
    export default exact;
}
declare module "*" with { type: "text" } {
    const wild: "wild";
    export default wild;
}

// @filename: /main.ts
// Attribute-less import uses the plain exact ambient.
import plain from "pkg";
const isPlain: boolean = plain.plain;

// Attributed import: the exact attribute-keyed ambient wins over both the plain
// exact ambient and the wildcard attribute-keyed ambient.
import exact from "pkg" with { type: "text" };
const isExact: "exact" = exact;
