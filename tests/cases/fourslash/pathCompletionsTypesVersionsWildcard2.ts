/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /node_modules/foo/package.json
//// {
////   "types": "index.d.ts",
////   "typesVersions": {
////     "<=3.4.1": {
////       "*": ["ts-old/*"]
////     }
////   }
//// }

// @Filename: /node_modules/foo/nope.d.ts
//// export const nope = 0;

// @Filename: /node_modules/foo/ts-old/index.d.ts
//// export const index = 0;

// @Filename: /node_modules/foo/ts-old/blah.d.ts
//// export const blah = 0;

// @Filename: /node_modules/foo/ts-old/subfolder/one.d.ts
//// export const one = 0;

// @Filename: /a.ts
//// import { } from "foo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["nope", "ts-old"],
});
