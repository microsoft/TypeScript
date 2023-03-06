/// <reference path="fourslash.ts" />

// This is the same test as pathCompletionsTypesVersionsWildcard5, but
// with the path patterns shuffled to ensure iteration order doesn't matter.

// @module: commonjs

// @Filename: /node_modules/foo/package.json
//// {
////   "types": "index.d.ts",
////   "typesVersions": {
////     "*": {
////       "bar/*": ["dist/*"],
////       "exact-match": ["dist/index.d.ts"],
////       "foo/*": ["dist/*"],
////       "*": ["dist/*"]
////     }
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

// @Filename: /a.ts
//// import { } from "foo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["bar", "exact-match", "foo", "blah", "index", "subfolder"],
});

edit.insert("foo/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: ["blah", "index", "foo", "subfolder"],
});

edit.insert("foo/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: ["onlyInFooFolder"],
});
