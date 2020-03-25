/// <reference path="fourslash.ts" />

////const outOfScope = 0;
////
////declare module 'mod' {
////  const a: string;
////  type T = number;
////  export { /**/ };
////}

verify.completions({
  marker: "",
  exact: ["a", "T"]
});

edit.insert("a");

verify.completions({
  marker: "",
  exact: ["T"]
});
