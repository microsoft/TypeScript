/// <reference path="fourslash.ts" />

////function f() {
////    class C {}
////    return (c: C) => void;
////}
////f()(new /**/);

goTo.marker("");
verify.not.completionListContains("C"); // Not accessible
