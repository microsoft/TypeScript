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

goTo.marker("local");
verify.occurrencesAtPositionCount(2);

goTo.marker("global");
verify.occurrencesAtPositionCount(3);