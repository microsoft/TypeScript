/// <reference path="fourslash.ts" />

////class A {
////    foo(nu/**/: number) {
////    }
////}

// Completion list shouldn't be present in argument name position
verify.completions({ marker: "", exact: undefined });
