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
    newRangeContent: `<A a-c={"a-c"} a-d={"a-d"} b-c={"b-c"} b-d={"b-d"}></A>`
});
