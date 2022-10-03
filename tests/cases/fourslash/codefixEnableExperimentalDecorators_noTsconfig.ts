/// <reference path='fourslash.ts' />

// @Filename: /dir/a.ts
////declare const decorator: any;
////class A {
//// @decorator method() {};
////};

goTo.file("/dir/a.ts");
verify.not.codeFixAvailable();
