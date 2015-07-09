/// <reference path='fourslash.ts'/>

////interface I {
////    property1: number;
////    property2: string;
////}
////
////function f({ property1, /**/ }: I): void {
////}

goTo.marker("");
verify.completionListContains("property2");
verify.not.completionListContains("property1");
verify.not.completionListAllowsNewIdentifier();