/// <reference path='fourslash.ts'/>

// @Filename: a.ts
// @newLine: lf
////const enum TestEnum {
////    Foo, Bar
////}
////var testFirstFile = TestEnum.Bar;

// @Filename: b.ts
/////// <reference path="a.ts" />
/////*1*/
////var testInOtherFile = TestEnum.Bar;

goTo.marker("1");
verify.verifyGetEmitOutputForCurrentFile(
"/// <reference path=\"a.ts\" />\n\
var testInOtherFile = 1 /* TestEnum.Bar */;\n"
    )