/// <reference path='fourslash.ts' />

////
//// /**
////  * @typedef {(number|string|undefined)} Foo
////  */
////

verify.codeFix({
  description: ts.Diagnostics.JSDoc_typedef_may_be_converted_to_TypeScript_type.message,
  index: 0,
  newFileContent: `
type Foo = number | string | undefined;
`,
});