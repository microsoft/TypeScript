// @noImplicitReferences: true
// This tests that augmenting an untyped module is forbidden even in an ambient context. Contrast with `moduleAugmentationInDependency.ts`.

// @Filename: /node_modules/augmenter/index.d.ts
declare module "js" {
    export const j: number;
}
export {};

// @Filename: /node_modules/js/index.js
This file is not processed.

// @Filename: /a.ts
import { } from "augmenter";
