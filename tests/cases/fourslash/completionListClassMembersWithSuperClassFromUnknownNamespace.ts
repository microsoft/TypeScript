/// <reference path="fourslash.ts" />

////class Child extends Namespace.Parent {
////    /**/
////}

goTo.marker("");
verify.completionListContainsClassElementKeywords();
verify.completionListCount(verify.allowedClassElementKeywords.length);