//// [tests/cases/compiler/recursiveTupleTypeLabeledRestElement.ts] ////

//// [a.ts]
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

//// [b.js]
/** @typedef {string | ["i", ...rest: JSDocLabeled[]]} JSDocLabeled */

/** @type {JSDocLabeled} */
export const ok4 = ["i", "a", ["i"]];

/** @type {JSDocLabeled} */
export const bad4 = ["i", 1];


//// [a.js]
export const ok1 = ["i", "a", ["i", "b"]];
export const ok2 = ["li", 0, "a", ["i"]];
export const ok3 = ["root", 1, ["leaf", 2]];
export const bad1 = ["i", 1];
export const bad2 = ["li", "0"];
export const bad3 = ["root", "1"];
//// [b.js]
/** @typedef {string | ["i", ...rest: JSDocLabeled[]]} JSDocLabeled */
/** @type {JSDocLabeled} */
export const ok4 = ["i", "a", ["i"]];
/** @type {JSDocLabeled} */
export const bad4 = ["i", 1];


//// [a.d.ts]
export type Unlabeled = string | ["i", ...Unlabeled[]];
export type Labeled = string | ["i", ...rest: Labeled[]];
export type LabeledAfterLabeled = string | ["li", index: number, ...rest: LabeledAfterLabeled[]];
export type LabeledBeforeLabeled = string | ["a", ...rest: LabeledBeforeLabeled[], last: number];
export type LabeledParenthesized = string | ["a", ...rest: (LabeledParenthesized)[]];
export type DocNode = string | ["i", ...children: DocNode[]] | ["li", index: number, ...children: DocNode[]];
export type Tree<T> = T | [label: string, ...children: Tree<T>[]];
export declare const ok1: Labeled;
export declare const ok2: DocNode;
export declare const ok3: Tree<number>;
export declare const bad1: Labeled;
export declare const bad2: DocNode;
export declare const bad3: Tree<number>;
//// [b.d.ts]
/** @typedef {string | ["i", ...rest: JSDocLabeled[]]} JSDocLabeled */
export type JSDocLabeled = string | ["i", ...rest: JSDocLabeled[]];
/** @type {JSDocLabeled} */
export declare const ok4: JSDocLabeled;
/** @type {JSDocLabeled} */
export declare const bad4: JSDocLabeled;
