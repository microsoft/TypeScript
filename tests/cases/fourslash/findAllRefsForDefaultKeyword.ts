/// <reference path="fourslash.ts" />

// @noLib: true
////function f(value: string, /*1*/default: string) {}
////
////const /*2*/default = 1;
////
////function /*3*/default() {}
////
////class /*4*/default {}
////
////const foo = {
////    /*5*/default: 1
////}

verify.baselineFindAllReferences("1", "2", "3", "4", "5");
