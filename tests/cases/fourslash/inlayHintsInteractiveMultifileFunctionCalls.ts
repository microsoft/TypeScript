/// <reference path="fourslash.ts" />

// @Target: esnext
// @module: node18

// @Filename: aaa.mts
////import { helperB } from "./bbb.mjs";
////helperB("hello, world!");

// @Filename: bbb.mts
////import { helperC } from "./ccc.mjs";

////export function helperB(bParam: string) {
////    helperC(bParam);
////}

// @Filename: ccc.mts
////export function helperC(cParam: string) {}

goTo.file("./aaa.mts");
verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all",
    interactiveInlayHints: true
});
