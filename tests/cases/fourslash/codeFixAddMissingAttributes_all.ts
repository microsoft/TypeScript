/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: foo.tsx
////interface P {
////    a: number;
////    b: string;
////    c: number[];
////    d: any;
////}
////const A = ({ a, b, c, d }: P) =>
////    <div>{a}{b}{c}{d}</div>;
////const props = { a: 1, b: "" };
////
////const C1 = () =>
////    <A a={1} b={""}></A>
////const C2 = () =>
////    <A {...props}></A>
////const C3 = () =>
////    <A c={[]} {...props}></A>
////const C4 = () =>
////    <A></A>

goTo.file("foo.tsx");
verify.codeFixAll({
    fixId: "fixMissingAttributes",
    fixAllDescription: ts.Diagnostics.Add_all_missing_attributes.message,
    newFileContent:
`interface P {
    a: number;
    b: string;
    c: number[];
    d: any;
}
const A = ({ a, b, c, d }: P) =>
    <div>{a}{b}{c}{d}</div>;
const props = { a: 1, b: "" };

const C1 = () =>
    <A a={1} b={""} c={[]} d={undefined}></A>
const C2 = () =>
    <A c={[]} d={undefined} {...props}></A>
const C3 = () =>
    <A d={undefined} c={[]} {...props}></A>
const C4 = () =>
    <A a={0} b={""} c={[]} d={undefined}></A>`
});
