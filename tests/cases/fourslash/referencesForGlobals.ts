/// <reference path='fourslash.ts'/>

// Global variable reference.

// @Filename: referencesForGlobals_1.ts
////var /*1*/global = 2;
////
////class foo {
////    constructor (public global) { }
////    public f(global) { }
////    public f2(global) { }
////}
////
////class bar {
////    constructor () {
////        var n = global;
////
////        var f = new foo('');
////        f.global = '';
////    }
////}
////
////var k = global;

// @Filename: referencesForGlobals_2.ts
////var m = global;

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker("1");
verify.referencesCountIs(4);