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
////    [|<A a={100} b={""} c={[]} d={undefined}></A>|]

verify.not.codeFixAvailable("fixMissingAttributes");
