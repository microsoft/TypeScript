//// [tests/cases/conformance/nonjsExtensions/declarationFilesForNodeNativeModules.ts] ////

//// [package.json]
{"type": "module"}
//// [package.json]
{"type": "commonjs"}
//// [native.d.node.ts]
export function doNativeThing(flag: string): unknown;
//// [main.ts]
import mod = require("./dir/native.node");
mod.doNativeThing("good");


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mod = require("./dir/native.node");
mod.doNativeThing("good");
