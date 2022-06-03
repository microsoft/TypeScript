//// [tests/cases/compiler/nodeNextImportModeImplicitIndexResolution2.ts] ////

//// [package.json]
{ "name": "@types/dedent", "version": "1.0.0", "main": "" }

//// [package.json]
{ "name": "@types/dedent2", "version": "1.0.0", "main": "asdfasdfasdf" }

//// [package.json]
{ "name": "@types/dedent3", "version": "1.0.0", "main": "asdfasdfasdf", "exports": null }

//// [package.json]
{ "name": "@types/dedent4", "version": "1.0.0", "main": "asdfasdfasdf", "exports": "./asdfasdfasdf" }

//// [index.d.ts]
export {};

//// [index.d.ts]
export {};

//// [index.d.ts]
export {};

//// [index.d.ts]
export {};

//// [index.mts]
import dedent from "dedent";
import dedent2 from "dedent2";
import dedent3 from "dedent3";
import dedent4 from "dedent4"; // Error

//// [index.cts]
import dedent from "dedent";
import dedent2 from "dedent2";
import dedent3 from "dedent3";
import dedent4 from "dedent4"; // Error


//// [index.mjs]
export {};
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
