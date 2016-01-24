/// <reference path='fourslash.ts'/>

////interface I {
////    property1: number;
////    property2: string;
////}
////
////var { property1: prop1, /**/ }: I;

goTo.marker("");
verify.completionListContains("property2");
verify.not.completionListContains("property1");
verify.not.completionListContains("prop1");
verify.not.completionListAllowsNewIdentifier();