/// <reference path='fourslash.ts' />

////class C {
////    const example = [|{ a : "one"; c : "two"}|]
////}

verify.codeFixAvailable([
    { description: `Change ';' to ','` }
]);

verify.codeFix({
    description: "Change ';' to ','",
    index: 0,
    newRangeContent: `{ a : "one", c : "two"}`,
});