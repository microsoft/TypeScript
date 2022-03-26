/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: foo.tsx

////type A = 'a' | 'b';
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
    newRangeContent: `<A ad={"ad"} ac={"ac"} bd={"bd"} bc={"bc"}></A>`
});
