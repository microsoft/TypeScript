/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function outer<O>(o: O) {
////  return function middle<M>(m: M) {
////    return function inner<I>(i: I) {
////      added/*1*/(o, m, i);
////    }
////  }
////}

goTo.marker("1");
verify.codeFix({
  description: "Add missing function declaration 'added'",
  index: 0,
  newFileContent: `function outer<O>(o: O) {
  return function middle<M>(m: M) {
    return function inner<I>(i: I) {
      added(o, m, i);
    }
  }
}

function added<O, M, I>(o: O, m: M, i: I) {
    throw new Error("Function not implemented.");
}
`,
});
