/// <reference path='fourslash.ts' />

////interface I {
////    a: number;
////    b: number;
////    c: number;
////}
////function foo([|{ a, ...[|{| "contextRangeIndex": 0 |}rest|] }: I|]) {
////    [|rest|];
////}

const [r0Def, r0, r1] = test.ranges();
verify.baselineRename(r0, { providePrefixAndSuffixTextForRename: true });
