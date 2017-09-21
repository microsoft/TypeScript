/// <reference path='fourslash.ts' />
//// var index = { set p(x: [|*|]) { } };
verify.rangeAfterCodeFix("any");
