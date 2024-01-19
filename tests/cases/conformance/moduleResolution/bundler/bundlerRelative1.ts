// @moduleResolution: bundler
// @module: esnext, preserve
// @traceResolution: true

// @Filename: /dir/index.ts
export const x = 0;

// @Filename: /redirect/package.json
{ "main": "../foo" }

// @Filename: /foo/index.ts
export const y = 0;

// @Filename: /types/esm.d.ts
declare const _: string;
export default _;

// @Filename: /types/cjs.d.ts
declare const _: string;
export = _;

// @Filename: /main.ts
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
