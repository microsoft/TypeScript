/// <reference path="fourslash.ts" />

////function f<T extends { x: number }>(p: T & (T extends { hello: string } ? { goodbye: number } : {})) {}
////f({ x/*x*/: 0, hello/*hello*/: "", goodbye/*goodbye*/: 0, abc/*abc*/: "" })


verify.completions({
  marker: "x",
  exact: ["x"]
});

verify.completions({
  marker: "hello",
  exact: []
});

verify.completions({
  marker: "goodbye",
  exact: ["goodbye"]
});

verify.completions({
  marker: "abc",
  exact: []
});
