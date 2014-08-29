/// <reference path='fourslash.ts'/>

////declare module /*1*/"foo" {
////    var f: number;
////}
////
////declare module "bar" {
////    export import foo = require(/*2*/"foo");
////    var f2: typeof foo./*4*/f;
////}
////
////declare module "baz" {
////    import bar = require(/*3*/"bar");
////    var f2: typeof bar./*5*/foo;
////}

goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("2");
verify.referencesCountIs(2);

goTo.marker("3");
verify.referencesCountIs(2);

goTo.marker("4");
verify.referencesCountIs(2);

goTo.marker("5");
verify.referencesCountIs(3);