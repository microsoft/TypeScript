// @target: esnext
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /types.d.ts
declare module "*.style" with { type: "css" } {
    export interface Bar {}
}

// @filename: /a.ts
import * as NS from "./a.style";
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
