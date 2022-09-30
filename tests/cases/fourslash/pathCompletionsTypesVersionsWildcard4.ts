/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /node_modules/foo/package.json
//// {
////   "types": "index.d.ts",
////   "typesVersions": {
////     ">=4.3.5": {
////       "component-*": ["cjs/components/*"]
////     }
////   }
//// }

// @Filename: /node_modules/foo/nope.d.ts
//// export const nope = 0;

// @Filename: /node_modules/foo/cjs/components/index.d.ts
//// export const index = 0;

// @Filename: /node_modules/foo/cjs/components/blah.d.ts
//// export const blah = 0;

// @Filename: /node_modules/foo/cjs/components/subfolder/one.d.ts
//// export const one = 0;

// @Filename: /a.ts
//// import { } from "foo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["component-blah", "component-index", "component-subfolder", "nope", "cjs"],
});

edit.insert("component-subfolder/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: ["one"],
});
