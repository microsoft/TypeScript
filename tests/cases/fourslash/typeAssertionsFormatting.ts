/// <reference path='fourslash.ts' />

////( <  any   >      publisher);/*1*/
//// <  any  >      3;/*2*/


format.document();

goTo.marker("1");
verify.currentLineContentIs("(<any>publisher);");

goTo.marker("2");
verify.currentLineContentIs("<any>3;");