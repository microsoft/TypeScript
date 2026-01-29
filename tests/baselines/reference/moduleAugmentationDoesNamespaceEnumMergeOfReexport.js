//// [tests/cases/compiler/moduleAugmentationDoesNamespaceEnumMergeOfReexport.ts] ////

//// [file.ts]
export namespace Root {
    // type-only NS
    export interface Foo {
        x: number;
    }
}
//// [reexport.ts]
export * from "./file";
//// [augment.ts]
import * as ns from "./reexport";

declare module "./reexport" {
    // Merging an enum into a type-only NS is OK
    export enum Root {
        A,
        B,
        C
    }
}

declare const f: ns.Root.Foo;
const g: ns.Root = ns.Root.A;

f.x;


//// [file.js]
export {};
//// [reexport.js]
export * from "./file";
//// [augment.js]
import * as ns from "./reexport";
const g = ns.Root.A;
f.x;
