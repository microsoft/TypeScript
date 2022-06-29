/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function outer<O>(o: O) {
////  return function inner<I>(i: I) {
////    added/*1*/(o, i);
////  }
////}

goTo.marker("1");
verify.codeFix({
  description: "Add missing function declaration 'added'",
  index: 0,
  newFileContent: `function outer<O>(o: O) {
  return function inner<I>(i: I) {
    added(o, i);
  }
}

function added<O, I>(o: O, i: I) {
    throw new Error("Function not implemented.");
}
`,
});
