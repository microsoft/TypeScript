//// [tests/cases/compiler/declarationEmitMonorepoBaseUrl.ts] ////

//// [package.json]
{
  "name": "@babel/parser",
  "version": "7.23.6",
  "main": "./lib/index.js",
  "types": "./typings/babel-parser.d.ts"
}

//// [babel-parser.d.ts]
export declare function createPlugin(): PluginConfig;
export declare class PluginConfig {}

//// [package.json]
{
  "name": "@vue/compiler-core",
  "version": "3.0.0",
  "main": "./src/index.ts",
  "dependencies": {
    "@babel/parser": "^7.0.0"
  }
}

//// [package.json]
{
  "name": "@vue/compiler-sfc",
  "version": "3.0.0",
  "main": "./src/index.ts",
  "dependencies": {
    "@babel/parser": "^7.0.0",
    "@vue/compiler-core": "^3.0.0"
  }
}

//// [index.ts]
import { PluginConfig } from "@babel/parser";

//// [index.ts]
import { createPlugin } from "@babel/parser";
export function resolveParserPlugins() {
  return [createPlugin()];
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveParserPlugins = resolveParserPlugins;
const parser_1 = require("@babel/parser");
function resolveParserPlugins() {
    return [(0, parser_1.createPlugin)()];
}


//// [index.d.ts]
export {};
//// [index.d.ts]
export declare function resolveParserPlugins(): import("@babel/parser").PluginConfig[];
