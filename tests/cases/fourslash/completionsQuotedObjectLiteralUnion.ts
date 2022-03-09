/// <reference path="fourslash.ts" />

//// interface A {
////   "a-prop": string;
//// }
//// 
//// interface B {
////   "b-prop": string;
//// }
//// 
//// const obj: A | B = {
////   "/*1*/"
//// }

verify.completions({
  marker: "1",
  exact: ["a-prop", "b-prop"]
});
