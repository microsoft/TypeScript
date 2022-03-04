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
////const Bar = () =>
////    [|<A {...{ a: 1, b: "" }}></A>|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_attributes.message,
    newRangeContent: `<A c={[]} d={undefined} {...{ a: 1, b: "" }}></A>`
});
