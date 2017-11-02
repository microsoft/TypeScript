/// <reference path="fourslash.ts" />

// @moduleResolution: node

// @Filename: /node_modules/x/foo.d.ts
////not read

// @Filename: /node_modules/x/bar.d.ts
////not read

// @Filename: /a.ts
////import {} from "/*1*/";
////import {} from "x//*2*/";

verify.completionsAt("1", ["x"]);
verify.completionsAt("2", ["bar", "foo"]);
