// Proposal: microsoft/TypeScript#46135 — declaration emit round-trips the
// `with { ... }` clause on an ambient module declaration.

// @module: esnext
// @moduleResolution: bundler
// @target: esnext
// @declaration: true
// @emitDeclarationOnly: true

// @filename: /global.ts
declare const marker: number;
declare module "*" with { type: "text" } {
    const data: string;
    export default data;
}
