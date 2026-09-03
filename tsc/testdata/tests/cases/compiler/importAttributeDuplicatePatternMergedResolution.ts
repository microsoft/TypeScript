// @strict: true
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /a.d.ts
declare module "*.asset" with { type: "css", format: "module" } {
    export const fromA: "a";
}

// @filename: /b.d.ts
declare module "*.asset" with { format: "module", type: "css" } {
    export const fromB: "b";
}

// @filename: /variantsA.d.ts
declare module "*.variant" with { type: "css" } {
    export const cssOnly: "css";
}

declare module "*.variant" with { type: "text" } {
    export const textOnly: "text";
}

// @filename: /variantsB.d.ts
declare module "*.variant" with { type: "css" } {
    export const cssAlso: "css-also";
}

declare module "*.variant" with { type: "text" } {
    export const textAlso: "text-also";
}

// @filename: /index.ts
import { fromA, fromB } from "./file.asset" with { type: "css", format: "module" };
import * as css from "./file.variant" with { type: "css" };
import * as text from "./file.variant" with { type: "text" };

const a: "a" = fromA;
const b: "b" = fromB;
const cssValue: "css" = css.cssOnly;
const cssAlsoValue: "css-also" = css.cssAlso;
const textValue: "text" = text.textOnly;
const textAlsoValue: "text-also" = text.textAlso;

const cssDoesNotHaveText: "textOnly" extends keyof typeof css ? false : true = true;
const textDoesNotHaveCss: "cssOnly" extends keyof typeof text ? false : true = true;