// @filename: file.ts
export namespace Root {
    // type-only NS
    export interface Foo {
        x: number;
    }
}
// @filename: reexport.ts
export * from "./file";
// @filename: augment.ts
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
