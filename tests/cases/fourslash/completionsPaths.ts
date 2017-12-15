/// <reference path="fourslash.ts" />

// @moduleResolution: node

// @Filename: /node_modules/x/foo.d.ts
////not read

// @Filename: /node_modules/x/bar.d.ts
////not read

// @Filename: /src/node_modules/y/index.d.ts
////not read

// @Filename: /src/a.ts
////import {} from "/*1*/";

// @Filename: /src/folder/b.ts
////import {} from "x//*2*/";

verify.completionsAt("1", ["y", "x"]);
verify.completionsAt("2", ["bar", "foo"]);
