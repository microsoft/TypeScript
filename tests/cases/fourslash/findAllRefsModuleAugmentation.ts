/// <reference path='fourslash.ts' />

// @Filename: /node_modules/foo/index.d.ts
/////*1*/export type /*2*/T = number;

// @Filename: /a.ts
////import * as foo from "foo";
////declare module "foo" {
////    export const x: /*3*/T;
////}

verify.noErrors();
verify.baselineFindAllReferences('1', '2', '3');
