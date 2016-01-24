/// <reference path='fourslash.ts'/>

// @Filename: m1.ts
////export var foo: number = 1;

// @Filename: m2.ts
////import * as /**/ from "m1"

goTo.marker();
verify.completionListIsEmpty();
verify.completionListAllowsNewIdentifier();