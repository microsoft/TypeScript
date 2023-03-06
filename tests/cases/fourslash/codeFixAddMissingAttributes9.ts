/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: foo.tsx

////type A = 'a-' | 'b-';
////type B = 'd' | 'c';
////type C = `${A}${B}`;

////const A = (props: { [K in C]: K }) =>
////   <div {...props}></div>;
////
////const Bar = () =>
////   [|<A></A>|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_attributes.message,
    newRangeContent: `<A a-d={"a-d"} a-c={"a-c"} b-d={"b-d"} b-c={"b-c"}></A>`
});
