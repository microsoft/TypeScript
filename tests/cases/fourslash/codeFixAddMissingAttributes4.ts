/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: foo.tsx

////interface P {
////    a: number;
////    b: string;
////    c: number[];
////    d: any;
////}
////
////const A = ({ a, b, c, d }: P) =>
////    <div>{a}{b}{c}{d}</div>;
////
////const props = { a: 1, c: [] };
////const Bar = () =>
////    [|<A {...props}></A>|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_attributes.message,
    newRangeContent: `<A b={""} d={undefined} {...props}></A>`
});
