/// <reference path='fourslash.ts'/>

// Global variable reference.

// @Filename: referencesForGlobals_1.ts
////var [|{| "isWriteAccess": true, "isDefinition": true |}global|] = 2;
////
////class foo {
////    constructor (public global) { }
////    public f(global) { }
////    public f2(global) { }
////}
////
////class bar {
////    constructor () {
////        var n = [|global|];
////
////        var f = new foo('');
////        f.global = '';
////    }
////}
////
////var k = [|global|];

// @Filename: referencesForGlobals_2.ts
////var m = [|global|];

verify.singleReferenceGroup("var global: number");
