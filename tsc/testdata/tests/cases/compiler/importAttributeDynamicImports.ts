// @strict: true
// @target: es2020
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /types.d.ts
declare module "*.resource" {
    export const kind: "plain";
}

declare module "typed/*.resource" with { type: "text" } {
    export const kind: "text";
}

// @filename: /index.ts
async function test() {
    const plain = await import("plain.resource");
    const plainKind: "plain" = plain.kind;

    const attributed = await import("typed/file.resource", { with: { type: "text" } });
    const attributedKind: "text" = attributed.kind;

    const parenthesized = await import("typed/parenthesized.resource", ({ with: { type: "text" } }));
    const parenthesizedKind: "text" = parenthesized.kind;

    const options = { with: { type: "text" as const } };
    const attributedWithOptions = await import("typed/other.resource", options);
    const attributedWithOptionsKind: "text" = attributedWithOptions.kind;

    const withoutAttributes = await import("typed/unattributed.resource");
    const withoutAttributesKind: "plain" = withoutAttributes.kind;

    const unmatchedAttributes = await import("fallback.resource", { with: { type: "unknown" } });
    const unmatchedAttributesKind: "plain" = unmatchedAttributes.kind;
}