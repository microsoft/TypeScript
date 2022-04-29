/// <reference path="fourslash.ts" />

////function f() {
////    class C {}
////    return (c: C) => void;
////}
////f()(new /**/);

verify.completions({ marker: "", excludes: "C" });
