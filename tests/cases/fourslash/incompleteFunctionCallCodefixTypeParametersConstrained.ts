/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function existing<T extends string, U extends T>(value: T, other: U) {
////  added/*1*/(value, other);
////}

goTo.marker("1");
verify.codeFix({
  description: "Add missing function declaration 'added'",
  index: 0,
  newFileContent: `function existing<T extends string, U extends T>(value: T, other: U) {
  added(value, other);
}

function added<T extends string, U extends T>(value: T, other: U) {
    throw new Error("Function not implemented.");
}
`,
});
