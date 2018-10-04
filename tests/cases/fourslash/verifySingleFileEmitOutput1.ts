/// <reference path='fourslash.ts' />

// @Filename: verifySingleFileEmitOutput1_file0.ts
////export class A {
////}
////export class Z {
////}

// @Filename: verifySingleFileEmitOutput1_file1.ts
////import f = require("./verifySingleFileEmitOutput1_file0");
////var /**/b = new f.A();

verify.quickInfoAt("", "var b: f.A");
