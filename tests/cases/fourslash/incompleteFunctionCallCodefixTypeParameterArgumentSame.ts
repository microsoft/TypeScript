/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function existing<T>(value: T) {
////  added/*1*/<T>(value, value);
////}

goTo.marker("1");
verify.codeFix({
  description: "Add missing function declaration 'added'",
  index: 0,
  newFileContent: `function existing<T>(value: T) {
  added<T>(value, value);
}

function added<T>(value: T, value1: T) {
    throw new Error("Function not implemented.");
}
`,
});
