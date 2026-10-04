// @strict: true
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /a.d.ts
declare module "*.asset" {
    export const fromA: "a";
}

// @filename: /b.d.ts
declare module "*.asset" {
    export const fromB: "b";
}

// @filename: /c.d.ts
declare module "*.asset" with {} {
    export const fromAttributed: "attributed";
}

// @filename: /augmentation.ts
export {};

declare module "augmented.asset" {
    export const augmented: "augmented";
}

// @filename: /index.ts
import * as augmented from "augmented.asset";
augmented.fromA;
augmented.fromB;
augmented.fromAttributed;
augmented.augmented;

import * as other from "other.asset";
other.fromA;
other.fromB;
other.fromAttributed;
other.augmented;

import * as explicitlyEmpty from "other.asset" with {};
explicitlyEmpty.fromA;
explicitlyEmpty.fromB;
explicitlyEmpty.fromAttributed;