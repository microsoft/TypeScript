/// <reference path="fourslash.ts" />

// @jsx: preserve
// @filename: /a.tsx
////type Props = { a: number } | { b: "somethingelse", c: 0 | 1 };
////declare function Foo(args: Props): any
////
////const a1 = <Foo b={"/*1*/"} />
////const a2 = <Foo b="/*2*/" />
////const a3 = <Foo b="somethingelse"/*3*/ />
////const a4 = <Foo b={"somethingelse"} /*4*/ />
////const a5 = <Foo b={"somethingelse"} c={0} /*5*/ />

verify.completions({ marker: ["1", "2"], exact: ["somethingelse"] });
verify.completions({ marker: ["3", "4"], excludes: ['"somethingelse"'], });
verify.completions({ marker: ["5"], excludes: ["0", "1"], });
