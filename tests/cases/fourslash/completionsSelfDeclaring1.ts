/// <reference path="fourslash.ts" />

////interface Test {
////  keyPath?: string;
////  autoIncrement?: boolean;
////}
////
////function test<T extends Record<string, Test>>(opt: T) { }
////
////test({
////  a: {
////    keyPath: '',
////    a/**/
////  }
////})

verify.completions({
  marker: "",
  exact: [{
    name: "autoIncrement",
    sortText: completion.SortText.OptionalMember
  }]
});
