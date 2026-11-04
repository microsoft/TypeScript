// @target: esnext
// @module: commonjs, esnext, preserve
// @rewriteRelativeImportExtensions: true
// @disableDynamicImportExtensionRewriting: true, false
// @allowJs: true
// @outDir: out
// @noTypesAndSymbols: true

// @filename: globals.d.ts
declare function require(specifier: string): any;

// @filename: imports.ts
import { path } from "./target.ts";
export { path } from "./target.ts";

import("./target.ts");
import(`./target.ts`);
import(path);
import(`./${path}`);
import(import("./target.ts") as any);
require(path);

// @filename: requires.js
export {};
require("./target.ts");
require(`./target.ts`);
require("./" + "target.ts");
require(require("./target.ts").path);
import("./target.ts");
import(require("./target.ts").path);

// @filename: target.ts
export const path = "./target.ts";
