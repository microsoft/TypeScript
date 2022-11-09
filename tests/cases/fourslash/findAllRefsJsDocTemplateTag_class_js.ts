/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: /a.js

// Both uses of T should be referenced.

/////** @template /*1*/T */
////class C {
////    constructor() {
////        /** @type {/*2*/T} */
////        this.x = null;
////    }
////}

verify.baselineFindAllReferences('1', '2');
