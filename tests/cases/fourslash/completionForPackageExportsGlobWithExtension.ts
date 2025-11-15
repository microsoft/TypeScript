/// <reference path="fourslash.ts" />

// @module: nodenext

// @Filename: /node_modules/@local/a/package.json
////{
////  "name": "@local/a",
////  "exports": {
////    "./glob/path/*.js": {
////      "import": "./build/*.js",
////      "types": "./build/*.d.ts"
////    }
////  }
////}

// @Filename: /node_modules/@local/a/build/bar.d.ts
////export const bar = "bar";

// @Filename: /node_modules/@local/a/build/baz.d.ts
////export const baz = "baz";

// @Filename: /test.ts
////import {} from "@local/a/glob/path//**/";

goTo.marker();
verify.completions({
    isNewIdentifierLocation: true,
    includes: [
        { name: "bar.js", kind: "script" },
        { name: "baz.js", kind: "script" }
    ]
});
