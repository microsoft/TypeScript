/// <reference path="fourslash.ts" />

////const a = "a";
////type T = number;
////export { /**/ };

verify.completions({
  marker: "",
  exact: ["a", "T"]
});

edit.insert("a");

verify.completions({
  marker: "",
  exact: ["T"]
});
