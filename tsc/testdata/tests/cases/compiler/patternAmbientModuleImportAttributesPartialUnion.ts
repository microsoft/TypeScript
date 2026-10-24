// @strict: true
// @target: esnext
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /types.d.ts
declare module "*.resource" {
    export const kind: "plain";
}

declare module "*.resource" with { type: "css" } {
    export const kind: "css";
}

// @filename: /index.ts
declare const partial: { type: "css" } | { [key: string]: "css" };
declare const readonlyPartial: { type: "css" } | { readonly [key: string]: "css" };
declare const required: { type: "css"; first: "a" } | { type: "css"; second: "b" };
declare const indexOnly: { [key: string]: "css" };
declare const optional: { type?: "css" };

async function test() {
    const fromPartial = await import("partial.resource", { with: partial });
    const partialKind: "plain" = fromPartial.kind;

    const fromReadonlyPartial = await import("readonlyPartial.resource", { with: readonlyPartial });
    const readonlyPartialKind: "plain" = fromReadonlyPartial.kind;

    const fromRequired = await import("required.resource", { with: required });
    const requiredKind: "css" = fromRequired.kind;

    const fromIndexOnly = await import("indexOnly.resource", { with: indexOnly });
    const indexOnlyKind: "plain" = fromIndexOnly.kind;

    const fromOptional = await import("optional.resource", { with: optional });
    const optionalKind: "plain" = fromOptional.kind;
}
