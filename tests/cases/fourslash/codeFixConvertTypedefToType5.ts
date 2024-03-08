/// <reference path='fourslash.ts' />

////
//// /**
////  * @typedef {number} Foo
////  */
////

verify.codeFix({
  description: ts.Diagnostics.Convert_typedef_to_TypeScript_type.message,
  index: 0,
  newFileContent: `
type Foo = number;
`,
});