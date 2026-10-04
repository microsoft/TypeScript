//// [tests/cases/compiler/declarationEmitPatternAmbientModuleImportAttributes.ts] ////

//// [types.d.ts]
declare module "*.style" with { type: "css" } {
    export interface Style {
        kind: "css";
    }
}

declare module "*.style" with { type: "text" } {
    export interface Style {
        kind: "text";
    }
}

declare module "*.note" with { type: "markdown" } {
    export interface Note {
        kind: "note";
    }
}

declare module "*.note" with { type: "md" } {
    export * from "*.note" with { type: "markdown" };
}


declare module "*.doc" with { type: "markdown" } {
    export interface Doc {
        kind: "doc";
    }
}

declare module "*.doc" with { type: "md" } {
    export * from "*.doc" with { type: "markdown" };
}

declare module "*.doc" with { type: "markdown" } {
    export interface MarkdownDoc {
        kind: "markdown-doc";
    }
}

declare module "*.bundle" with { type: "bundle" } {
    namespace bundle {
        interface Item {
            kind: "bundle";
        }
        const item: Item;
    }
    export = bundle;
}

//// [dependency.d.ts]
import * as bundle from "button.bundle" with { type: "bundle" };
import type { Style as CssStyle } from "button.style" with { type: "css" };
import type { Style as TextStyle } from "button.style" with { type: "text" };
import type { Doc } from "button.doc" with { type: "md" };
import type { Note } from "button.note" with { type: "md" };

export declare const cssStyle: CssStyle;
export declare const textStyle: TextStyle;
export declare const doc: Doc;
export declare const note: Note;
export declare const bundleValue: typeof bundle;
export declare const copiedSource: {
    note: import("button.note", { with: { type: "md" } }).Note;
};

//// [index.ts]
import { bundleValue, copiedSource, cssStyle, doc, note, textStyle } from "./dependency";

export const inferredCssStyle = cssStyle;
export const inferredTextStyle = textStyle;
export const inferredDoc = doc;
export const inferredNote = note;
export const inferredBundle = bundleValue;
export const inferredBundleAgain = bundleValue;
export const concreteOrigin = import("article.note", { with: { type: "md" } });
export const copiedImportType = { copiedSource };



//// [index.d.ts]
export declare const inferredCssStyle: import("*.style", { with: { type: "css" } }).Style;
export declare const inferredTextStyle: import("*.style", { with: { type: "text" } }).Style;
export declare const inferredDoc: import("*.doc", { with: { type: "markdown" } }).Doc;
export declare const inferredNote: import("*.note", { with: { type: "markdown" } }).Note;
export declare const inferredBundle: typeof import("*.bundle", { with: { type: "bundle" } });
export declare const inferredBundleAgain: typeof import("*.bundle", { with: { type: "bundle" } });
export declare const concreteOrigin: Promise<{
    default: typeof import("*.note", { with: { type: "md" } });
}>;
export declare const copiedImportType: {
    copiedSource: {
        note: import("*.note", { with: { type: "md" } }).Note;
    };
};
