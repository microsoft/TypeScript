/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function existing<T>(value: T) {
////  const keyofTypeof = Object.keys(value)[0] as keyof T;
////  added/*1*/(keyofTypeof);
////}

goTo.marker("1");
verify.codeFix({
  description: "Add missing function declaration 'added'",
  index: 0,
  newFileContent: `function existing<T>(value: T) {
  const keyofTypeof = Object.keys(value)[0] as keyof T;
  added(keyofTypeof);
}

function added(keyofTypeof: string | number | symbol) {
    throw new Error("Function not implemented.");
}
`,
});
