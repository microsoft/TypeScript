/// <reference path="fourslash.ts" />
// @strict: true

////function f<T>(x: T) {
////  return x;
////}
////
////f({ /**/ });


verify.completions({
  marker: "",
  includes: [{
    name: "Object",
    sortText: completion.SortText.GlobalsOrKeywords
  }]
});
