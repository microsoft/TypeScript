/// <reference path='fourslash.ts' />

// @strict: true
// @jsx: preserve

// @Filename: /a.tsx
//// /// <reference path="/.lib/react18/react18.d.ts" />
//// /// <reference path="/.lib/react18/global.d.ts" />
////
//// interface A {
////   type: "a";
////   value: string;
//// }
////
//// interface B {
////   type: "b";
////   size: number;
//// }
////
//// type Union = A | B;
////
//// function accept1<T extends Union>(union: NoInfer<T>) {}
//// accept1({ /*1*/ });
//// accept1({ type: "a", /*2*/ });
////
//// function accept2<T extends Union>(arg: { prop: NoInfer<T> }) {}
//// accept2({ prop: { /*3*/ } });
//// accept2({ prop: { type: "a", /*4*/ } });
////
//// function Accept3<T extends Union>(props: NoInfer<T>) {}
//// <Accept3 /*5*/ />;
//// <Accept3 type="a" /*6*/ />;

verify.completions({
  marker: ["1", "3", "5"],
  exact: ["size", "type", "value"],
});
verify.completions({
  marker: ["2", "4", "6"],
  exact: ["value"],
});
