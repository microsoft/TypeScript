// @filename: file.ts
export namespace Root {
    export interface Foo {
        x: number;
    }
}
// @filename: reexport.ts
export * from "./file";
// @filename: augment.ts
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