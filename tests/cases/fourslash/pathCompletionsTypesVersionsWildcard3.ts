/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /node_modules/foo/package.json
//// {
////   "types": "index.d.ts",
////   "typesVersions": {
////     ">=4.3.5": {
////       "browser/*": ["dist/*"]
////     }
////   }
//// }

// @Filename: /node_modules/foo/nope.d.ts
//// export const nope = 0;

// @Filename: /node_modules/foo/dist/index.d.ts
//// export const index = 0;

// @Filename: /node_modules/foo/dist/blah.d.ts
//// export const blah = 0;

// @Filename: /node_modules/foo/dist/subfolder/one.d.ts
//// export const one = 0;

// @Filename: /a.ts
//// import { } from "foo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["browser", "nope", "dist"],
});

edit.insert("browser/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: ["blah", "index", "subfolder"],
});

edit.insert("subfolder/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: ["one"],
});
