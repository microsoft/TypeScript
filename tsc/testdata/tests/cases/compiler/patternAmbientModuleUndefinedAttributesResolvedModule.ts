// @strict: true
// @target: esnext
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /types.d.ts
declare module "*" {
    export const kind: "wildcard";
}

declare module "*" with { type: "css" } {
    export const kind: "css";
}

// @filename: /actual.ts
export const kind = "actual";

// @filename: /index.ts
declare const options: ImportCallOptions;
declare const optionalAttributes: { type: "css" } | undefined;
declare const cssAttributes: { type: "css" };

async function test() {
    const withoutOptions = await import("./actual");
    const withoutOptionsKind: "actual" = withoutOptions.kind;

    const withUndefined = await import("./actual", { with: undefined });
    const withUndefinedKind: "actual" = withUndefined.kind;

    const withOptions = await import("./actual", options);
    const withOptionsKind: "actual" = withOptions.kind;

    const withOptionalAttributes = await import("./actual", { with: optionalAttributes });
    const withOptionalAttributesKind: "actual" = withOptionalAttributes.kind;

    const withEmptyAttributes = await import("./actual", { with: {} });
    const withEmptyAttributesKind: "actual" = withEmptyAttributes.kind;

    const withCssAttributes = await import("./actual", { with: cssAttributes });
    const withCssAttributesKind: "css" = withCssAttributes.kind;

    const unresolved = await import("./missing", { with: undefined });
    const unresolvedKind: "wildcard" = unresolved.kind;
}

async function generic<T extends { type: "css" } | undefined>(attributes: T) {
    const withGenericAttributes = await import("./actual", { with: attributes });
    const withGenericAttributesKind: "actual" = withGenericAttributes.kind;
}
