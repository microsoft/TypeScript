//// [tests/cases/compiler/declarationEmitRedundantTripleSlashModuleAugmentation.ts] ////

//// [index.d.ts]
declare module "foo" {
    export interface Original {}
}

//// [augmentation.ts]
export interface FooOptions {}
declare module "foo" {
    export interface Augmentation {}
}

//// [index.ts]
import { Original, Augmentation } from "foo";
import type { FooOptions } from "./augmentation";
export interface _ {
    original: Original;
    augmentation: Augmentation;
    options: FooOptions;
}




//// [augmentation.d.ts]
export interface FooOptions {
}
declare module "foo" {
    interface Augmentation {
    }
}
//// [index.d.ts]
import { Original, Augmentation } from "foo";
import type { FooOptions } from "./augmentation";
export interface _ {
    original: Original;
    augmentation: Augmentation;
    options: FooOptions;
}
