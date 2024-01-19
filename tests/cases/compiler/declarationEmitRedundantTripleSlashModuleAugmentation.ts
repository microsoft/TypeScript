// @declaration: true
// @emitDeclarationOnly: true
// @noTypesAndSymbols: true
// @module: nodenext

// @Filename: /node_modules/foo/index.d.ts
declare module "foo" {
    export interface Original {}
}

// @Filename: /augmentation.ts
export interface FooOptions {}
declare module "foo" {
    export interface Augmentation {}
}

// @Filename: /index.ts
import { Original, Augmentation } from "foo";
import type { FooOptions } from "./augmentation";
export interface _ {
    original: Original;
    augmentation: Augmentation;
    options: FooOptions;
}
