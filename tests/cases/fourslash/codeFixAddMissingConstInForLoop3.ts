/// <reference path='fourslash.ts' />

////[|for ([x] of [[1,2]]) {}|]

verify.codeFix({
    description: "Add const modifier to unresolved variable",
    newRangeContent: "for (const [x] of [[1,2]]) {}"
});
