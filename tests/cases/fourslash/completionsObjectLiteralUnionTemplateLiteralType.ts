/// <reference path="fourslash.ts" />

////type BrokenIntellisense = {
////  key: string;
////} | `string literal ${string}`;
////
////const brokenIntellisense: BrokenIntellisense = {
////  /*1*/
////};

verify.completions({
  marker: "1",
  exact: {
    name: "key"
  }
});