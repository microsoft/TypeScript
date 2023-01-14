/// <reference path='fourslash.ts' />

////
//// /**
////  * @typedef {Object}Foo
////  * @property {number}bar
////  */
////

verify.codeFix({
  description: ts.Diagnostics.JSDoc_typedef_may_be_converted_to_TypeScript_type.message,
  index: 0,
  newFileContent: `
interface Foo {
    bar: number;
}
`,
});