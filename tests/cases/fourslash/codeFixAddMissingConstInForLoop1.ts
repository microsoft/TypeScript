/// <reference path='fourslash.ts' />

////[|for (x of []) {}|]

verify.codeFix({
    description: "Add const modifier to unresolved variable",
    newRangeContent: "for (const x of []) {}"
});
