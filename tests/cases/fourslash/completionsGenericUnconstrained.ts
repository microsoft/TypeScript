/// <reference path="fourslash.ts" />
// @strict: true

////function f<T>(x: T) {
////  return x;
////}
////
////f({ /**/ });


verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  includes: [{
    name: "Object",
    sortText: completion.SortText.GlobalsOrKeywords
  }]
});
