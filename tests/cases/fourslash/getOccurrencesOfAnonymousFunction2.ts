/// <reference path='fourslash.ts' />

//////global foo definition
////function foo() {}
////
////(function f/*local*/oo(): number {
////    return foo(); // local foo reference
////})
//////global foo references
////fo/*global*/o();
////var f = foo;

verify.baselineDocumentHighlights(["local", "global"]);