// @strict: true
// @target: esnext
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /types.d.ts
declare module "*.resource" {
    export const kind: "plain";
}

declare module "*.resource" with { type: "text" } {
    export const kind: "text";
}

declare module "*.textonly" with { type: "text" } {
    export const kind: "text";
}

// @filename: /index.ts
declare const options: ImportCallOptions;
declare const anyAttributes: any;

async function test() {
    const withUndefined = await import("a.resource", { with: undefined });
    const withUndefinedKind: "plain" = withUndefined.kind;

    const fromOptions = await import("b.resource", options);
    const fromOptionsKind: "plain" = fromOptions.kind;

    const emptyOptions = await import("c.resource", {});
    const emptyOptionsKind: "plain" = emptyOptions.kind;

    const emptyWith = await import("d.resource", { with: {} });
    const emptyWithKind: "plain" = emptyWith.kind;

    const anyWith = await import("e.resource", { with: anyAttributes });
    const anyWithKind: "text" = anyWith.kind;

    const textOnlyUndefined = await import("f.textonly", { with: undefined });

    const textOnlyText = await import("g.textonly", { with: { type: "text" } });
    const textOnlyTextKind: "text" = textOnlyText.kind;
}
