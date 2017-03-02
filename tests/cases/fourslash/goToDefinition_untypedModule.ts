/// <reference path='fourslash.ts' />

// @Filename: /node_modules/foo/index.js
////not read

// @Filename: /a.ts
////import { f } from "foo";
/////**/f();

verify.goToDefinition("", []);
