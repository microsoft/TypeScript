/// <reference path="fourslash.ts" />

// @strictNullChecks: true

////function test<T extends string | undefined>(x: T) {
////    x/**/!;
////}

verify.typeAtLocation("", "string | undefined"); // TODO: GH#21317: should be "T".
