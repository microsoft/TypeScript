/// <reference path='fourslash.ts' />

////function f([|{[|{| "contextRangeIndex": 0 |}a|]}: {[|a|]}|]) {
////    f({[|a|]});
////}

const [r0Def, r0, r1, r2] = test.ranges();
verify.baselineRename([
    // renames the local
    r0, r2,
    // renames the property
    r1,
]);
