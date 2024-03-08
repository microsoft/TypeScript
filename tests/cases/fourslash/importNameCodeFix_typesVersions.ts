/// <reference path="fourslash.ts" />

// @module: commonjs
// @checkJs: true

// @Filename: /node_modules/unified/package.json
//// {
////   "name": "unified",
////   "types": "types/ts3.444/index.d.ts",
////   "typesVersions": {
////     ">=4.0": {
////       "types/ts3.444/*": [
////         "types/ts4.0/*"
////       ]
////     }
////   }
//// }

// @Filename: /node_modules/unified/types/ts3.444/index.d.ts
//// export declare const x: number;

// @Filename: /node_modules/unified/types/ts4.0/index.d.ts
//// export declare const x: number;

// @Filename: /foo.js
//// import {} from "unified";

// @Filename: /index.js
//// x/**/

verify.importFixModuleSpecifiers("", [
  "unified",
  // This obviously doesn't look like a desired module specifier, but the package.json is misconfigured
  // (taken from a real-world example). The fact that it resolves (according to TS) is good enough to
  // generate it.
  "unified/types/ts3.444/index.js",
], { importModuleSpecifierEnding: "js" });
