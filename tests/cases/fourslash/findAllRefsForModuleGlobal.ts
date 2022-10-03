/// <reference path="fourslash.ts" />

// @Filename: /node_modules/foo/index.d.ts
////export const x = 0;

// @Filename: /b.ts
/////// <reference types="foo" />
////import { x } from "/*1*/foo";
////declare module "foo" {}

verify.noErrors();
verify.baselineFindAllReferences('1')
