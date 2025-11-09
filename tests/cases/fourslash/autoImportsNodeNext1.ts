/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /node_modules/pack/package.json
//// {
////     "name": "pack",
////     "version": "1.0.0",
////     "exports": {
////         ".": "./main.mjs"
////     }
//// }

// @Filename: /node_modules/pack/main.d.mts
//// import {} from "./unreachable.mjs";
//// export const fromMain = 0;

// @Filename: /node_modules/pack/unreachable.d.mts
//// export const fromUnreachable = 0;

// @Filename: /index.mts
//// import { fromMain } from "pack";
//// fromUnreachable/**/

goTo.marker("");
verify.importFixAtPosition([]);

verify.completions({
  marker: "",
  excludes: ["fromUnreachable"],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: false,
  }
});
