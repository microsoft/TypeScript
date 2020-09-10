/// <reference path='fourslash.ts' />

////type Keys = number | string;
////type T = {
////    [Keys]: number;
////}

verify.codeFix({
    description: [ts.Diagnostics.Convert_0_to_1_in_0.message, "Keys", "K"],
    index: 0,
    newFileContent:
`type Keys = number | string;
type T = {
    [K in Keys]: number;
}`
});
