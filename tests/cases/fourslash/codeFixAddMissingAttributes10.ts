/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: foo.tsx

////type A = 'a' | 'b' | 'c' | 'd' | 'e';
////type B = 1 | 2 | 3;
////type C = '@' | '!';
////type D = `${A}${Uppercase<A>}${B}${C}`;

////const A = (props: { [K in D]: K }) =>
////   <div {...props}></div>;
////
////const Bar = () =>
////   [|<A></A>|]

verify.not.codeFixAvailable("fixMissingAttributes");

