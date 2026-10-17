// @target: esnext
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /types.d.ts
declare module "*.style" {
    export interface Bar { kind: "plain" }
}
declare module "*.style" with { type: "css" } {
    export interface Bar { kind: "css" }
}

// @filename: /a.ts
import * as NS from "./a.style" with { type: "css" };
declare global {
    namespace G {
        import Foo = NS.Bar;
        export { Foo };
    }
}

// @filename: /b.ts
export {};
declare global {
    namespace G {
        interface Foo {
            x: number;
        }
    }
}

// @filename: /c.ts
export const kind: G.Foo["kind"] = "css";
