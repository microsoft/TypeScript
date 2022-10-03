/// <reference path="fourslash.ts" />

// @jsx: preserve
// @filename: /a.tsx
////type Props = { a: number } | { b: "somethingelse" };
////declare function Foo(args: Props): any
////
////const a1 = <Foo b={"/*1*/"} />
////const a2 = <Foo b="/*2*/" />

verify.completions({ marker: ["1", "2"], exact: ["somethingelse"] });
