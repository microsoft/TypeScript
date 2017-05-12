/// <reference path='fourslash.ts' />

// @Filename: /node_modules/foo/index.js
////not read

// @Filename: /a.ts
////import { /*def*/f } from "foo";
/////*use*/f();

verify.goToDefinition("use", "def");
