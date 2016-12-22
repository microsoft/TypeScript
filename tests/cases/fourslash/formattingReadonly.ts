/// <reference path='fourslash.ts' />

////class C {
////  readonly    property1 {};/*1*/
////  public readonly   property2 {};/*2*/
////}

format.document();
goTo.marker("1");
verify.currentLineContentIs("    readonly property1 {};");
goTo.marker("2");
verify.currentLineContentIs("    public readonly property2 {};");