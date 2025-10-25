//// [tests/cases/conformance/moduleResolution/bundler/bundlerCommonJS.ts] ////

//// [package.json]
{
  "name": "pkg",
  "version": "1.0.0",
  "type": "commonjs",
  "exports": {
    "require": "./index.js"
  }
}

//// [index.d.ts]
export declare const x: number;

//// [package.json]
{
  "": "type module is ignored in --module commonjs",
  "type": "module"
}

//// [requires.ts]
import pkg = require("pkg");
pkg.x;

//// [imports.ts]
import { x } from "pkg";
x;

//// [real-imports.mts]
import { x } from "pkg"; // Error


//// [requires.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pkg = require("pkg");
pkg.x;
//// [imports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pkg_1 = require("pkg");
pkg_1.x;
//// [real-imports.mjs]
export {};
