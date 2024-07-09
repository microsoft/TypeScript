/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function existing<T, U>(value1: T | U & string, value2: U & T, value3: U | T, value4: U) {
////  added/*1*/(value1, value2, value3, value4);
////}

goTo.marker("1");
verify.codeFix({
  description: "Add missing function declaration 'added'",
  index: 0,
  newFileContent: `function existing<T, U>(value1: T | U & string, value2: U & T, value3: U | T, value4: U) {
  added(value1, value2, value3, value4);
}

function added<T, U, V>(value1: T, value2: U, value3: V, value4: U) {
    throw new Error("Function not implemented.");
}
`,
});
