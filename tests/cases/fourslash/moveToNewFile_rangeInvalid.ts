/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|const x = 0;
////const|] y = 0;
////function f() {
////    [|function inner() {}|]
////}

verify.noMoveToNewFile();
