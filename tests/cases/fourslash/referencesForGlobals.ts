/// <reference path='fourslash.ts'/>

// Global variable reference.

// @Filename: referencesForGlobals_1.ts
/////*1*/var /*2*/global = 2;
////
////class foo {
////    constructor (public global) { }
////    public f(global) { }
////    public f2(global) { }
////}
////
////class bar {
////    constructor () {
////        var n = /*3*/global;
////
////        var f = new foo('');
////        f.global = '';
////    }
////}
////
////var k = /*4*/global;

// @Filename: referencesForGlobals_2.ts
////var m = /*5*/global;

verify.baselineFindAllReferences('1', '2', '3', '4', '5');
