/// <reference path="fourslash.ts" />

////// Completion after invalid character
////module testModule {
////    export var foo = 1;
////}
////@
////testModule./**/

verify.completions({ marker: "", exact: "foo" });
