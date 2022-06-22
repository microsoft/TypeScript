/// <reference path="fourslash.ts" />

// @module: nodenext

// @Filename: /node_modules/foo/package.json
//// {
////   "types": "index.d.ts",
////   "exports": {
////     "./*": "dist/*",
////     "./foo/*": "dist/*",
////     "./bar/*": "dist/*",
////     "./exact-match": "dist/index.d.ts"
////   }
//// }

// @Filename: /node_modules/foo/nope.d.ts
//// export const nope = 0;

// @Filename: /node_modules/foo/dist/index.d.ts
//// export const index = 0;

// @Filename: /node_modules/foo/dist/blah.d.ts
//// export const blah = 0;

// @Filename: /node_modules/foo/dist/foo/onlyInFooFolder.d.ts
//// export const foo = 0;

// @Filename: /node_modules/foo/dist/subfolder/one.d.ts
//// export const one = 0;

// @Filename: /a.mts
//// import { } from "foo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["blah.js", "index.js", "foo", "subfolder", "bar", "exact-match"],
});

edit.insert("foo/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: ["blah.js", "index.js", "foo", "subfolder"],
});

edit.insert("foo/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: ["onlyInFooFolder.js"],
});
