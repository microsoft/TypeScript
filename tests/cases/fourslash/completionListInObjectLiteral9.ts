/// <reference path="fourslash.ts" />

////function f1<T extends true | { a?: true } = true>(t?: T): void {
////  return
////}
////
////f1({/*1*/})

verify.completions({ marker: "1", exact: { name: "a", sortText: completion.SortText.OptionalMember } });
