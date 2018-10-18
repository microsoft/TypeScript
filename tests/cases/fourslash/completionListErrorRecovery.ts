/// <reference path="fourslash.ts" />

////class Foo { static fun() { }; }

////Foo./**/;
/////*1*/var bar;

goTo.marker();
verify.completionListContains("fun");
verify.not.errorExistsAfterMarker("1");