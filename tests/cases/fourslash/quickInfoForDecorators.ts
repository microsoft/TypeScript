/// <reference path='fourslash.ts' />

////@/*1*/decorator
////class C {

////}
/////** decorator documentation*/
////var decorator = t=> t;

goTo.marker("1");
verify.quickInfoIs("var decorator: (t: any) => any", "decorator documentation");