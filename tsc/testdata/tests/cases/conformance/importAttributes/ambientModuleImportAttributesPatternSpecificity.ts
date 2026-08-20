// Proposal: microsoft/TypeScript#46135 — specifier patterns on attribute-keyed
// ambient modules reuse the existing pattern ambient module specificity rules:
// the match with the longest prefix before the `*` wins, independent of
// declaration order. (As with plain pattern ambient modules, a trailing-only
// pattern such as `*.svg` has an empty prefix and therefore does NOT outrank a
// bare `*`; that tie is resolved by declaration order and is an open question
// for the proposal.)

// @module: esnext
// @moduleResolution: bundler
// @target: esnext
// @strict: true
// @noEmit: true

// @filename: /ambient.d.ts
declare module "*" with { type: "asset" } {
    const wildcard: "wildcard";
    export default wildcard;
}
declare module "https://*" with { type: "asset" } {
    const url: "url";
    export default url;
}

// @filename: /main.ts
// The bare "*" pattern applies to a relative specifier.
import local from "./something.png" with { type: "asset" };
const isWildcard: "wildcard" = local;

// The longer "https://" prefix wins even though "*" is declared first.
import remote from "https://example.com/logo" with { type: "asset" };
const isUrl: "url" = remote;
