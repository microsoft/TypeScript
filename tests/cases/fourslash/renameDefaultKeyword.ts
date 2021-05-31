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
////    /*5*/[|default|]: 1
////}

for (const marker of ["1", "2", "3", "4"]) {
    goTo.marker(marker);
    verify.renameInfoFailed(ts.Diagnostics.You_cannot_rename_this_element.message);
}

goTo.marker("5");
verify.renameInfoSucceeded("default");
