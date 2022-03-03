/// <reference path='fourslash.ts' />

////type K = number | string;
////type T = {
////    [K]: number;
////}

verify.codeFix({
    description: [ts.Diagnostics.Convert_0_to_1_in_0.message, "K", "P"],
    index: 0,
    newFileContent:
`type K = number | string;
type T = {
    [P in K]: number;
}`
});
