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
const _ = require("./a"); // No resolution
_.a; // any

//// [main.ts]
import {} from "./a";
import _ = require("./a"); // Error
export = {}; // Error
export {};

//// [a.ts]
export const a = "a";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "a";
//// [mainJs.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve().then(function () { return require("./a"); });
var _ = require("./a"); // No resolution
_.a; // any
//// [main.js]
"use strict";
module.exports = {};
