/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// {
////   "types": "index.d.ts",
////   "imports": {
////     "#*": "dist/*",
////     "#foo/*": "dist/*",
////     "#bar/*": "dist/*",
////     "#exact-match": "dist/index.d.ts"
////   }
//// }

// @Filename: /nope.d.ts
//// export const nope = 0;

// @Filename: /dist/index.d.ts
//// export const index = 0;

// @Filename: /dist/blah.d.ts
//// export const blah = 0;

// @Filename: /dist/foo/onlyInFooFolder.d.ts
//// export const foo = 0;

// @Filename: /dist/subfolder/one.d.ts
//// export const one = 0;

// @Filename: /a.mts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#blah.js", kind: "script", kindModifiers: ".js" },
    { name: "#index.js", kind: "script", kindModifiers: ".js" },
    { name: "#foo", kind: "directory" },
    { name: "#subfolder", kind: "directory" },
    { name: "#bar", kind: "directory" },
    { name: "#exact-match", kind: "script" },
  ],
});

edit.insert("#foo/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: [
    { name: "blah.js", kind: "script", kindModifiers: ".js" },
    { name: "index.js", kind: "script", kindModifiers: ".js" },
    { name: "foo", kind: "directory" },
    { name: "subfolder", kind: "directory" },
  ],
});

edit.insert("foo/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: [{ name: "onlyInFooFolder.js", kind: "script", kindModifiers: ".js" }],
});
