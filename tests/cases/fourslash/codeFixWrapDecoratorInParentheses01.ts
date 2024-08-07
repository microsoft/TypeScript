/// <reference path='fourslash.ts' />

////declare var x: any;
////class C {
////    @[|x?.y|]
////    bar() {
////
////    }
////}

verify.codeFix({
    description: "Wrap in parentheses",
    newRangeContent: `(x?.y)`
});
