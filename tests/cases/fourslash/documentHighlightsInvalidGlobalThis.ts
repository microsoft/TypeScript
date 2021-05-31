/// <reference path="fourslash.ts" />

////declare global {
////    export { globalThis as [|global|] }
////}

for (const r of test.ranges()) {
    verify.documentHighlightsOf(r, [r]);
}
