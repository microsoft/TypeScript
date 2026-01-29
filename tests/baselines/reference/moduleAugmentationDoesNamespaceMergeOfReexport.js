//// [tests/cases/compiler/moduleAugmentationDoesNamespaceMergeOfReexport.ts] ////

//// [file.ts]
export namespace Root {
    export interface Foo {
        x: number;
    }
}
//// [reexport.ts]
export * from "./file";
//// [augment.ts]
import * as ns from "./reexport";

declare module "./reexport" {
    export namespace Root {
        export interface Foo {
            self: Foo;
        }
    }
}

declare const f: ns.Root.Foo;

f.x;
f.self;
f.self.x;
f.self.self;

//// [file.js]
export {};
//// [reexport.js]
export * from "./file";
//// [augment.js]
f.x;
f.self;
f.self.x;
f.self.self;
export {};
