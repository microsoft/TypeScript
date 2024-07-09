/// <reference path="fourslash.ts" />

////declare function test<
////  Variants extends Partial<Record<'hover' | 'pressed', string>>,
////>(v: Variants): void
////
////test({
////  hover: "",
////  /**/
////});

verify.completions({
  marker: '',
  exact: [{
      name: 'pressed',
      sortText: completion.SortText.OptionalMember
  }]
});
