/// <reference path='fourslash.ts'/>

////module ATest {
////    export interface Bar { }
////}
////
////function ATest() { }
////
////import /*definition*/alias = ATest;
////
////var a: /*namespace*/alias.Bar;
/////*value*/alias.call(this);

goTo.marker("definition");
verify.referencesCountIs(3);

goTo.marker("namespace");
verify.referencesCountIs(3);

goTo.marker("value");
verify.referencesCountIs(3);