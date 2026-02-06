/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////function foo() {
////    [|"use strict";|]
////}

verify.noMoveToNewFile();
