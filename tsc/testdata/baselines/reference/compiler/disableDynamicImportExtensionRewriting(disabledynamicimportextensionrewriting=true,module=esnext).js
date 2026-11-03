//// [tests/cases/compiler/disableDynamicImportExtensionRewriting.ts] ////

//// [globals.d.ts]
declare function require(specifier: string): any;

//// [imports.ts]
import { path } from "./target.ts";
export { path } from "./target.ts";

import("./target.ts");
import(`./target.ts`);
import(path);
import(`./${path}`);
import(import("./target.ts") as any);
require(path);

//// [requires.js]
export {};
require("./target.ts");
require(`./target.ts`);
require("./" + "target.ts");
require(require("./target.ts").path);
import("./target.ts");
import(require("./target.ts").path);

//// [target.ts]
export const path = "./target.ts";


//// [target.js]
export const path = "./target.ts";
//// [imports.js]
import { path } from "./target.js";
export { path } from "./target.js";
import("./target.js");
import(`./target.ts`);
import(path);
import(`./${path}`);
import(import("./target.js"));
require(path);
//// [requires.js]
export {};
require("./target.js");
require(`./target.ts`);
require("./" + "target.ts");
require(require("./target.js").path);
import("./target.js");
import(require("./target.js").path);
