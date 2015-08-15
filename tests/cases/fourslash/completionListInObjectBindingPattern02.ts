/// <reference path='fourslash.ts'/>

////interface I {
////    property1: number;
////    property2: string;
////}
////
////var foo: I;
////var { property1, /**/ } = foo;

goTo.marker();
verify.completionListContains("property2");
verify.not.completionListContains("property1");
verify.not.completionListAllowsNewIdentifier();