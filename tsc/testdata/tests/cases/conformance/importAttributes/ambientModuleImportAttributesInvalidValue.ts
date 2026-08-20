// Proposal: microsoft/TypeScript#46135 — attribute values on an ambient module
// declaration must be string literals, matching the rule for import/export
// attribute values. Ambient module declarations do not flow through the
// import/export attribute validation, so this is checked separately.

// @module: esnext
// @moduleResolution: bundler
// @target: esnext
// @noEmit: true

// @filename: /ambient.d.ts
declare module "*" with { type: 1 } {
    const data: string;
    export default data;
}
