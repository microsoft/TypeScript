//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsConditionalPackageExports.ts] ////

//// [index.js]
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/a";
import * as mjsi from "inner/b";
import * as typei from "inner";
import * as ts from "inner/types";
cjsi.mjsSource;
mjsi.mjsSource;
typei.mjsSource;
ts.mjsSource;
//// [index.mjs]
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/a";
import * as mjsi from "inner/b";
import * as typei from "inner";
import * as ts from "inner/types";
cjsi.mjsSource;
mjsi.mjsSource;
typei.mjsSource;
ts.mjsSource;
//// [index.cjs]
// cjs format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/a";
import * as mjsi from "inner/b";
import * as typei from "inner";
import * as ts from "inner/types";
cjsi.cjsSource;
mjsi.cjsSource;
typei.implicitCjsSource;
ts.cjsSource;
//// [index.d.ts]
// cjs format file
import * as cjs from "inner/a";
import * as mjs from "inner/b";
import * as type from "inner";
import * as ts from "inner/types";
export { cjs };
export { mjs };
export { type };
export { ts };
export const implicitCjsSource = true;
//// [index.d.mts]
// esm format file
import * as cjs from "inner/a";
import * as mjs from "inner/b";
import * as type from "inner";
import * as ts from "inner/types";
export { cjs };
export { mjs };
export { type };
export { ts };
export const mjsSource = true;
//// [index.d.cts]
// cjs format file
import * as cjs from "inner/a";
import * as mjs from "inner/b";
import * as type from "inner";
import * as ts from "inner/types";
export { cjs };
export { mjs };
export { type };
export { ts };
export const cjsSource = true;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "exports": {
        "./a": {
            "require": "./index.cjs",
            "node": "./index.mjs"
        },
        "./b": {
            "import": "./index.mjs",
            "node": "./index.cjs"
        },
        ".": {
            "import": "./index.mjs",
            "node": "./index.js"
        },
        "./types": {
            "types": {
                "import": "./index.d.mts",
                "require": "./index.d.cts",
            },
            "node": {
                "import": "./index.mjs",
                "require": "./index.cjs"
            }
        }
    }
}

//// [index.mjs]
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/a";
import * as mjsi from "inner/b";
import * as typei from "inner";
import * as ts from "inner/types";
cjsi.mjsSource;
mjsi.mjsSource;
typei.mjsSource;
ts.mjsSource;
//// [index.cjs]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// cjs format file
const cjs = __importStar(require("package/cjs"));
const mjs = __importStar(require("package/mjs"));
const type = __importStar(require("package"));
cjs;
mjs;
type;
const cjsi = __importStar(require("inner/a"));
const mjsi = __importStar(require("inner/b"));
const typei = __importStar(require("inner"));
const ts = __importStar(require("inner/types"));
cjsi.cjsSource;
mjsi.cjsSource;
typei.implicitCjsSource;
ts.cjsSource;
//// [index.js]
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/a";
import * as mjsi from "inner/b";
import * as typei from "inner";
import * as ts from "inner/types";
cjsi.mjsSource;
mjsi.mjsSource;
typei.mjsSource;
ts.mjsSource;


//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
//// [index.d.ts]
export {};
