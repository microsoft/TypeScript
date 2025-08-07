/// <reference path='fourslash.ts' />

// @target: esnext

//// declare const obj: {
////   a?: string;
////   b: number;
//// };
////
//// if ("/*1*/" in obj) {}
//// if (((("/*2*/"))) in obj) {}
//// if ("/*3*/" in (((obj)))) {}
//// if (((("/*4*/"))) in (((obj)))) {}
////
//// type MyUnion = { missing: true } | { result: string };
//// declare const u: MyUnion;
//// if ("/*5*/" in u) {}
////
//// class Cls1 { foo = ''; #bar = 0; }
//// declare const c1: Cls1;
//// if ("/*6*/" in c1) {}
////
//// class Cls2 { foo = ''; private bar = 0; }
//// declare const c2: Cls2;
//// if ("/*7*/" in c2) {}

verify.completions({
  marker: ["1", "2", "3", "4"],
  exact: ["a", "b"],
});
verify.completions({
  marker: "5",
  exact: ["missing", "result"],
});
verify.completions({
  marker: "6",
  exact: ["foo"],
});
verify.completions({
  marker: "7",
  exact: ["bar", "foo"],
});
