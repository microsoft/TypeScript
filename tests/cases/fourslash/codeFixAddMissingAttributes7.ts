/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: foo.tsx

////interface P {
////    a: number;
////    b?: string;
////}
////
////const A = ({ a, b }: P) =>
////    <div>{a}{b}</div>;
////
////const Bar = () =>
////    [|<A></A>|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_attributes.message,
    newRangeContent: `<A a={0}></A>`
});
