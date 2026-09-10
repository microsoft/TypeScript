// @strict: true
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /types.d.ts
declare module "*.asset" {
    export const plain: "plain";
}

declare module "attributed/*.asset" with { type: "css" } {
    export const attributed: "attributed";
}

declare module "*.special" with { type: "special" } {
    export const attributed: "attributed";
}

// @filename: /augmentations.ts
export {};

declare module "merged.asset" {
    export const augmented: "augmented";
}

declare module "attributed/file.asset" {
    export const augmented: "augmented";
}

declare module "unattributed.special" {
    export const augmented: "augmented";
}

// @filename: /index.ts
import * as merged from "merged.asset";
merged.plain;
merged.augmented;

import * as attributed from "attributed/file.asset" with { type: "css" };
attributed.attributed;
attributed.augmented;

import * as unattributed from "unattributed.special";
unattributed.attributed;
unattributed.augmented;