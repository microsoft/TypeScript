/// <reference path='fourslash.ts' />

// @moduleResolution: node
// @filename: /node_modules/test/index.js
////export const x = 1;

// @filename: /foo.ts
////import * as test from "test";
////test.foo();

goTo.file("/foo.ts");
verify.not.codeFixAvailable();
