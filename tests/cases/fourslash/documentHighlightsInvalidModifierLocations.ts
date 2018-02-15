/// <reference path="fourslash.ts" />

////class C {
////    m([|readonly|] p) {}
////}
////function f([|readonly|] p) {}

for (const r of test.ranges()) {
    verify.documentHighlightsOf(r, [r]);
}
