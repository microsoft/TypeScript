/// <reference path='fourslash.ts' />

//// var p0 = ({a/*1*/a}) => {console.log(aa)};
//// function f2({ [|a/*a1*/1|], [|b/*b1*/1|] }: { /*a1_dest*/a1: number, /*b1_dest*/b1: number } = { a1: 0, b1: 0 }) {}

verify.baselineGoToDefinition(
    "1",
    "a1",
    "b1",
);