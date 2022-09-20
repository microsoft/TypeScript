/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function existing<T1, T, T2>(t1: T1, t: T, t2a: T2, t2b: T2, t2c: T2) {
////  added/*1*/(t2a, t2b, t2c, t1, t, t2a, t2c, t2b);
////}

goTo.marker("1");
verify.codeFix({
  description: "Add missing function declaration 'added'",
  index: 0,
  newFileContent: `function existing<T1, T, T2>(t1: T1, t: T, t2a: T2, t2b: T2, t2c: T2) {
  added(t2a, t2b, t2c, t1, t, t2a, t2c, t2b);
}

function added<T2, T1, T>(t2a: T2, t2b: T2, t2c: T2, t1: T1, t: T, t2a1: T2, t2c1: T2, t2b1: T2) {
    throw new Error("Function not implemented.");
}
`,
});
