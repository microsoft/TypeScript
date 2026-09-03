// @strict: true
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true
// @allowJs: true
// @checkJs: true

// @filename: /types.d.ts
declare module "*.style" with { type: "css" } {
    export interface Style {
        kind: "css";
    }
}

declare module "require/*.style" with { type: "css", "resolution-mode": "require" } {
    export interface RequireStyle {
        kind: "require-css";
    }
}

// @filename: /reexports.ts
export type { Style } from "plain.style" with { type: "css" };
export type { RequireStyle } from "require/reexport.style" with { type: "css", "resolution-mode": "require" };

// @filename: /jsdoc.js
/** @import { Style } from "jsdoc.style" with { type: "css" } */

/** @type {Style} */
const jsdocStyle = { kind: "css" };
const jsdocCssKind = jsdocStyle.kind;

// @filename: /index.ts
import type { Style } from "plain.style" with { type: "css" };
import type { RequireStyle } from "require/import.style" with { type: "css", "resolution-mode": "require" };

type ImportTypeStyle = import("inline.style", { with: { type: "css" } }).Style;
type ImportTypeRequireStyle = import("require/inline.style", { with: { type: "css", "resolution-mode": "require" } }).RequireStyle;

declare const importedStyle: Style;
declare const importedRequireStyle: RequireStyle;
declare const importTypeStyle: ImportTypeStyle;
declare const importTypeRequireStyle: ImportTypeRequireStyle;

const cssKind: "css" = importedStyle.kind;
const requireCssKind: "require-css" = importedRequireStyle.kind;
const importTypeCssKind: "css" = importTypeStyle.kind;
const importTypeRequireCssKind: "require-css" = importTypeRequireStyle.kind;