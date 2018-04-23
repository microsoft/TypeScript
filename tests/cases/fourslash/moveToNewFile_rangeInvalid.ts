/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|const x = 0;
////const|] y = 0;
////function f() {
////    [|function inner() {}|]
////}

for (const range of test.ranges()) {
    goTo.selectRange(range);
    verify.not.refactorAvailable("Move to new file")
}
