/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function e<T extends "phone" | "home">() {
////  let et: T = 'phone'
////  added1/*1*/(et)
////  et = 'home'
////  added2/*2*/(et)
////}

goTo.marker("1");
verify.codeFix({
  description: "Add missing function declaration 'added1'",
  index: 0,
  newFileContent: `function e<T extends "phone" | "home">() {
  let et: T = 'phone'
  added1(et)
  et = 'home'
  added2(et)
}

function added1(et: string) {
    throw new Error("Function not implemented.")
}
`,
});

goTo.marker("2");
verify.codeFix({
  description: "Add missing function declaration 'added1'",
  index: 0,
  newFileContent: `function e<T extends "phone" | "home">() {
  let et: T = 'phone'
  added1(et)
  et = 'home'
  added2(et)
}

function added1(et: string) {
    throw new Error("Function not implemented.")
}
`,
});
