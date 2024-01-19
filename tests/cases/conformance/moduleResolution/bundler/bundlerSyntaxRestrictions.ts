// @moduleResolution: bundler
// @module: esnext, preserve
// @checkJs: true
// @allowJs: true
// @outDir: out

// @Filename: /node_modules/@types/node/index.d.ts
declare var require: (...args: any[]) => any;

// @Filename: /ambient.d.ts
declare module "fs" {
    export function readFileSync(path: string, encoding?: string): string;
}
declare module "path" {
    import fs = require("fs"); // ok
    namespace path {
        export const sep: string;
    }
    export = path; // ok
}

// @Filename: /mainJs.js
import {} from "./a";
import("./a");
const _ = require("./a");
_.a; // any

// @Filename: /main.ts
import {} from "./a";
import _ = require("./a"); // Error in esnext
export = {}; // Error
export {};

// @Filename: /a.ts
export const a = "a";
