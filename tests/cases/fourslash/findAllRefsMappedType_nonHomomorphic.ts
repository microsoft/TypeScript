/// <reference path="fourslash.ts" />

// @strict: true

////function f(x: { [K in "m"]: number; }) {
////    x.[|m|];
////    x.[|m|]
////}

verify.singleReferenceGroup("(property) m: number");
