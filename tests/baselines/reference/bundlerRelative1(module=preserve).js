//// [tests/cases/conformance/moduleResolution/bundler/bundlerRelative1.ts] ////

//// [index.ts]
export const x = 0;

//// [package.json]
{ "main": "../foo" }

//// [index.ts]
export const y = 0;

//// [esm.d.ts]
declare const _: string;
export default _;

//// [cjs.d.ts]
declare const _: string;
export = _;

//// [main.ts]
import { x } from "./dir";
import {} from "./dir/index";
import {} from "./dir/index.js";
import {} from "./dir/index.ts";

import { y } from "./redirect";
import {} from "./redirect/index";

import a from "./types/esm";
import * as esm from "./types/esm";
import b from "./types/cjs";
import * as cjs from "./types/cjs";


//// [index.js]
export var x = 0;
//// [index.js]
export var y = 0;
//// [main.js]
