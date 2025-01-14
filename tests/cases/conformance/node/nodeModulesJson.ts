// @module: node16,node18,nodenext
// @resolveJsonModule: true
// @noEmit: true

// @Filename: /node_modules/not.json/package.json
{
  "name": "not.json",
  "version": "1.0.0",
  "type": "module",
  "exports": "./index.js"
}

// @Filename: /node_modules/not.json/index.d.ts
export function oops(json: string): any;

// @Filename: /node_modules/actually-json/package.json
{
  "name": "actually-json",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": "./index.json",
    "./typed": "./typed.d.json.ts"
  }
}

// @Filename: /node_modules/actually-json/index.json
{}

// @Filename: /node_modules/actually-json/typed.d.json.ts
declare const _default: {};
export default _default;

// @Filename: /config.json
{
  "version": 1
}

// @Filename: /main.mts
import { oops } from "not.json"; // Ok
import moreOops from "actually-json"; // Error in nodenext
import typed from "actually-json/typed"; // Error in nodenext

import config from "./config.json" with { type: "json" }; // Ok
import { default as config1 } from "./config.json" with { type: "json" }; // Ok
import config2 from "./config.json"; // Error in nodenext, no attribute
import type config2Type from "./config.json"; // Ok, type-only
import type config2Type2 from "./config.json" with { type: "json" }; // Error, import attributes not allowed on type-only imports
import { version } from "./config.json" with { type: "json" }; // Error, named import
import * as config3 from "./config.json" with { type: "json" };
config3.version; // Error
config3.default; // Ok

// @Filename: /loosey.cts
import config from "./config.json" with { type: "json" }; // Error
import config2 from "./config.json"; // Ok
import { version } from "./config.json"; // Ok
import * as config3 from "./config.json";
config3.version; // Ok
config3.default; // Error
