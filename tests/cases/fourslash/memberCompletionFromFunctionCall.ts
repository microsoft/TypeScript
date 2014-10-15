/// <reference path="fourslash.ts" />

////declare interface ifoo {
////    text: (value: any) => ifoo;
////}
////declare var foo: ifoo;
////foo.text(function() { })/**/

goTo.marker();
edit.insert(".");
verify.not.memberListIsEmpty();
verify.memberListContains("text");