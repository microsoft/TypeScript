//// [tests/cases/conformance/moduleResolution/bundler/bundlerSyntaxRestrictions.ts] ////

//// [index.d.ts]
declare var require: (...args: any[]) => any;

//// [ambient.d.ts]
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

//// [mainJs.js]
import {} from "./a";
import("./a");
const _ = require("./a");
_.a; // any

//// [main.ts]
import {} from "./a";
import _ = require("./a"); // Error in esnext
export = {}; // Error
export {};

//// [a.ts]
export const a = "a";


//// [a.js]
export var a = "a";
//// [mainJs.js]
import("./a");
var _ = require("./a");
_.a; // any
//// [main.js]
module.exports = {};
