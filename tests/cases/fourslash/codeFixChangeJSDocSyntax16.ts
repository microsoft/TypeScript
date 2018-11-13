/// <reference path='fourslash.ts' />
//// var f: { [K in keyof number]: [|*|] };

verify.codeFix({
    description: "Change '*' to 'any'",
    newRangeContent: "any",
});
