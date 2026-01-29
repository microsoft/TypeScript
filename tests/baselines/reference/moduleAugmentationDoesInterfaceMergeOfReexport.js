//// [tests/cases/compiler/moduleAugmentationDoesInterfaceMergeOfReexport.ts] ////

//// [file.ts]
export interface Foo {
    x: number;
}
//// [reexport.ts]
export * from "./file";
//// [augment.ts]
import * as ns from "./reexport";

declare module "./reexport" {
    export interface Foo {
        self: Foo;
    }
}

declare const f: ns.Foo;

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
