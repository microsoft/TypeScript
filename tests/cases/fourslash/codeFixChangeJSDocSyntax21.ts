/// <reference path='fourslash.ts' />
//// var index = { set p(x: [|*|]) { } };

verify.codeFix({
    description: "Change '*' to 'any'",
    newRangeContent: "any",
});
