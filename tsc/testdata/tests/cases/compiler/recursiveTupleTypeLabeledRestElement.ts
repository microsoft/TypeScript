// @strict: true
// @declaration: true
// @allowJs: true
// @checkJs: true
// @outDir: out

// https://github.com/microsoft/TypeScript/issues/63584

// Labeling a rest element should not change whether a recursive tuple type is accepted.

// @filename: a.ts
export type Unlabeled = string | ["i", ...Unlabeled[]];
export type Labeled = string | ["i", ...rest: Labeled[]];

export type LabeledAfterLabeled = string | ["li", index: number, ...rest: LabeledAfterLabeled[]];
export type LabeledBeforeLabeled = string | ["a", ...rest: LabeledBeforeLabeled[], last: number];
export type LabeledParenthesized = string | ["a", ...rest: (LabeledParenthesized)[]];

export type DocNode =
    | string
    | ["i", ...children: DocNode[]]
    | ["li", index: number, ...children: DocNode[]];

export type Tree<T> = T | [label: string, ...children: Tree<T>[]];

export const ok1: Labeled = ["i", "a", ["i", "b"]];
export const ok2: DocNode = ["li", 0, "a", ["i"]];
export const ok3: Tree<number> = ["root", 1, ["leaf", 2]];

export const bad1: Labeled = ["i", 1];
export const bad2: DocNode = ["li", "0"];
export const bad3: Tree<number> = ["root", "1"];

// @filename: b.js
/** @typedef {string | ["i", ...rest: JSDocLabeled[]]} JSDocLabeled */

/** @type {JSDocLabeled} */
export const ok4 = ["i", "a", ["i"]];

/** @type {JSDocLabeled} */
export const bad4 = ["i", 1];
