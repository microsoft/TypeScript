/// <reference path="fourslash.ts" />

////const outOfScope = 0;
////
////declare module 'mod' {
////  const a: string;
////  type T = number;
////  export { /**/ };
////}

const type = { name: "type", sortText: completion.SortText.GlobalsOrKeywords };

verify.completions({
  marker: "",
  exact: ["a", "T", type]
});

// Deprioritize 'a' since it has been exported already.
// (Keep it in the list because you can still do 'a as b'.)
edit.insert("a, ");
verify.completions({
  exact: ["T", { name: "a", sortText: completion.SortText.OptionalMember }, type]
});

// No completions for new name
edit.insert("T as ");
verify.completions({
  exact: []
});

// 'T' still hasn't been exported by name
edit.insert("U, ");
verify.completions({
  exact: ["T", { name: "a", sortText: completion.SortText.OptionalMember }, type]
});

// 'a' and 'T' are back to the same priority
edit.insert("T, ");
verify.completions({
  exact: [
    { name: "a", sortText: completion.SortText.OptionalMember },
    { name: "T", sortText: completion.SortText.OptionalMember },
    type,
  ]
});
