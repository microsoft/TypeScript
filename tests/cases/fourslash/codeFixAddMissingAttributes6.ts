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
////const props = { a: 1, b: "", c: [], d: undefined };
////const Bar = () =>
////    [|<A {...props}></A>|]

verify.not.codeFixAvailable("fixMissingAttributes");
