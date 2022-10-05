/// <reference path="fourslash.ts" />

////type M<Self, K = Exclude<keyof Self, "k">> = { 
////  a?: number,
////  b?: number,
////  c?: number,
////  d?: number,
////  k?: K
////}
////declare const f1: <T extends M<T>>(m: T) => T
////
////f1({ 
////  a: 1,
////  b: 2,
////  x: 3,
////  k: "a",
////  /*1*/
////})

verify.completions({ 
  marker: "1",
  includes: [
      { name: "c", sortText: completion.SortText.OptionalMember },
      { name: "d", sortText: completion.SortText.OptionalMember }
  ] 
});
