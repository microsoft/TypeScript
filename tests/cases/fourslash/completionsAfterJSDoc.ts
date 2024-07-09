/// <reference path="fourslash.ts" />

////export interface Foo {
////  /** JSDoc */
////  /**/foo(): void;
////}

// Should not crash, #35632
verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [{
    name: "readonly",
    kind: "keyword",
    sortText: completion.SortText.GlobalsOrKeywords
  }]
});
