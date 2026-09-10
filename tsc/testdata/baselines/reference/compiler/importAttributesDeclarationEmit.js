//// [tests/cases/compiler/importAttributesDeclarationEmit.ts] ////

//// [types.d.ts]
declare module "*.style" with { type: "css" } {
    export interface Style {
        kind: "css";
    }
}

declare module "formatted/*.style" with { type: "css", format: "module" } {
    export interface FormattedStyle {
        kind: "css-module";
    }
}

//// [index.ts]
import type { Style } from "plain.style" with { type: "css" };
import type { FormattedStyle } from "formatted/import.style" with { type: "css", format: "module" };

export interface LocalStyle extends Style {}
export interface LocalFormattedStyle extends FormattedStyle {}

export type { Style } from "reexport.style" with { type: "css" };
export type { FormattedStyle } from "formatted/reexport.style" with { type: "css", format: "module" };

export type InlineStyle = import("inline.style", { with: { type: "css" } }).Style;
export type InlineFormattedStyle = import("formatted/inline.style", { with: { type: "css", format: "module" } }).FormattedStyle;



//// [index.d.ts]
import type { Style } from "plain.style" with { type: "css" };
import type { FormattedStyle } from "formatted/import.style" with { type: "css", format: "module" };
export interface LocalStyle extends Style {
}
export interface LocalFormattedStyle extends FormattedStyle {
}
export type { Style } from "reexport.style" with { type: "css" };
export type { FormattedStyle } from "formatted/reexport.style" with { type: "css", format: "module" };
export type InlineStyle = import("inline.style", { with: { type: "css" } }).Style;
export type InlineFormattedStyle = import("formatted/inline.style", { with: { type: "css", format: "module" } }).FormattedStyle;
