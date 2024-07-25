/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function existing<T>(value: T) {
////  added/*1*/<T, string>(value, "");
////}

goTo.marker("1");
verify.codeFix({
  description: "Add missing function declaration 'added'",
  index: 0,
  newFileContent: `function existing<T>(value: T) {
  added<T, string>(value, "");
}

function added<T, U>(value: T, arg1: string) {
    throw new Error("Function not implemented.");
}
`,
});
