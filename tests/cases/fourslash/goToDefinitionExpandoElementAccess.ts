/// <reference path="fourslash.ts" />

////function f() {}
////f[/*0*/"x"] = 0;
////f[[|/*1*/"x"|]] = 1;

verify.baselineGoToDefinition("1");
