//// [tests/cases/compiler/moduleAugmentationEnumClassMergeOfReexportIsError.ts] ////

//// [file.ts]
export class Foo {
    member: string;
}
//// [reexport.ts]
export * from "./file";
//// [augment.ts]
import * as ns from "./reexport";

declare module "./reexport" {
    export enum Foo {
        A, B, C
    }
}

declare const f: ns.Foo; //is this the enum or the class? should be an error.


//// [file.js]
export class Foo {
}
//// [reexport.js]
export * from "./file";
//// [augment.js]
export {};
