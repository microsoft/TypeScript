// @filename: file.ts
export interface Foo {
    x: number;
}
// @filename: reexport.ts
export * from "./file";
// @filename: augment.ts
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