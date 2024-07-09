// @filename: file.ts
export class Foo {
    member: string;
}
// @filename: reexport.ts
export * from "./file";
// @filename: augment.ts
import * as ns from "./reexport";

declare module "./reexport" {
    export enum Foo {
        A, B, C
    }
}

declare const f: ns.Foo; //is this the enum or the class? should be an error.
