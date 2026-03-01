/// <reference path='fourslash.ts' />

////type A = { a: string };
////type B = { b: string };
////
////[|const c = { } satisfies A satisfies B;|]

verify.codeFix({
  index: 0,
  description: ts.Diagnostics.Add_missing_properties.message,
  newRangeContent:
`const c = {
    a: ""
} satisfies A satisfies B;`,
});
