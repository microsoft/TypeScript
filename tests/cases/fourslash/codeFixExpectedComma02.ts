/// <reference path='fourslash.ts' />

////class C {
////    const example = [|["one"; "two"]|]
////}

verify.codeFixAvailable([
    { description: `Change ';' to ','` }
]);

verify.codeFix({
    description: "Change ';' to ','",
    index: 0,
    newRangeContent: `["one", "two"]`,
});