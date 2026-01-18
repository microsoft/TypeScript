// @noTypesAndSymbols: true
// @module: commonjs
// @moduleResolution: bundler
// @traceResolution: true
// @libReplacement: false

// @Filename: /node_modules/pkg/package.json
{
  "name": "pkg",
  "version": "1.0.0",
  "type": "commonjs",
  "exports": {
    "require": "./index.js"
  }
}

// @Filename: /node_modules/pkg/index.d.ts
export declare const x: number;

// @Filename: /package.json
{
  "": "type module is ignored in --module commonjs",
  "type": "module"
}

// @Filename: /requires.ts
import pkg = require("pkg");
pkg.x;

// @Filename: /imports.ts
import { x } from "pkg";
x;

// @Filename: /real-imports.mts
import { x } from "pkg"; // Error
