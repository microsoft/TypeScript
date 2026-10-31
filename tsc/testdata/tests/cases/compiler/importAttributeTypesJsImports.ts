// @strict: true
// @module: preserve
// @moduleResolution: bundler
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: /types.d.ts
declare module "*.asset" with { type: "css" } {
    export const shared: "css";
    export const cssOnly: "css-only";
}

declare module "*.asset" with { type: "text" } {
    export const shared: "text";
    export const textOnly: "text-only";
}

// @filename: /index.js
/** @import * as css from "./file.asset" with { type: "css" } */
/** @import * as text from "./file.asset" with { type: "text" } */

/** @type {typeof css.shared} */
const cssShared = "css";
/** @type {typeof text.shared} */
const textShared = "text";

/** @type {typeof css.cssOnly} */
const cssOnly = "css-only";
/** @type {typeof text.textOnly} */
const textOnly = "text-only";
/** @type {typeof css.textOnly} */
const cssTextOnly = "text-only";
/** @type {typeof text.cssOnly} */
const textCssOnly = "css-only";