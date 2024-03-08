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
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const mod = __require("./dir/native.node");
mod.doNativeThing("good");
