/// <reference path='fourslash.ts' />

//// interface I {}
//// [|/* */ class /* */ C /* */ extends /* */ I|]{}

verify.codeFix({
    description: "Change 'extends' to 'implements'.",
    newRangeContent: "/* */ class /* */ C /* */ implements /* */ I",
});
