/// <reference path='fourslash.ts' />
//// var index = { get p(): [|*|] { return 12 } };
verify.rangeAfterCodeFix("any");
