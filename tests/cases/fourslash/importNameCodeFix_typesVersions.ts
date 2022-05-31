/// <reference path="fourslash.ts" />

// @module: commonjs
// @checkJs: true

// @Filename: /node_modules/unified/package.json
//// {
////   "name": "unified",
////   "types": "types/ts3.4/index.d.ts",
////   "typesVersions": {
////     ">=4.0": {
////       "types/ts3.4/*": [
////         "types/ts4.0/*"
////       ]
////     }
////   }
//// }

// @Filename: /node_modules/unified/types/ts3.4/index.d.ts
//// export declare const x: number;

// @Filename: /node_modules/unified/types/ts4.0/index.d.ts
//// export declare const x: number;

// @Filename: /foo.js
//// import {} from "unified";

// @Filename: /index.js
//// x/**/

verify.importFixModuleSpecifiers("", [
  "unified",
  "unified/types/ts3.4/", // TODO: this is wrong #49034
], { importModuleSpecifierEnding: "js" });
