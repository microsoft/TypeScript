/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /node_modules/foo/package.json
//// {
////   "types": "index.d.ts",
////   "exports": {
////     "./component-*": {
////       "types@>=4.3.5": "types/components/*.d.ts"
////     }
////   }
//// }

// @Filename: /node_modules/foo/nope.d.ts
//// export const nope = 0;

// @Filename: /node_modules/foo/types/components/index.d.ts
//// export const index = 0;

// @Filename: /node_modules/foo/types/components/blah.d.ts
//// export const blah = 0;

// @Filename: /node_modules/foo/types/components/subfolder/one.d.ts
//// export const one = 0;

// @Filename: /a.ts
//// import { } from "foo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "component-blah", kind: "script" },
    { name: "component-index", kind: "script" },
    { name: "component-subfolder", kind: "directory" },
  ],
});

edit.insert("component-subfolder/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: [{ name: "one", kind: "script" }],
});
