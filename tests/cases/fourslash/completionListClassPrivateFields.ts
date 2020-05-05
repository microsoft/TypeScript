/// <reference path="fourslash.ts" />

////class A {
////    #private = 1;
////}
////
////class B extends A {
////    /**/
////}

verify.completions({
    marker: "",
    exact: completion.classElementKeywords,
    isNewIdentifierLocation: true
});
