/// <reference path='fourslash.ts'/>

////interface I {
////    property1: number;
////    property2: string;
////}
////
////var foo: I;
////var { /**/ } = foo;

goTo.marker();
verify.completionListContains("property1");
verify.completionListContains("property2");
verify.not.completionListAllowsNewIdentifier();