// @strict: true
// @module: preserve
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: /readonlyError.d.ts
declare module "*.css" with { readonly type: "css" } {
    const stylesheet: CSSStyleSheet;
    export default stylesheet;
}

declare module "*.json" with { readonly type: "json", readonly kind: "data" } {
    const data: any;
    export default data;
}

// @filename: /otherModifierError.d.ts
declare module "*.svg" with { public type: "svg" } {
    const content: string;
    export default content;
}

// @filename: /valid.d.ts
declare module "*.txt" with { type: "text" } {
    const text: string;
    export default text;
}
