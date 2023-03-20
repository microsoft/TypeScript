/// <reference path='fourslash.ts' />

////
//// /**
////  * @typedef {Object}Foo
////  * @property {number}bar
////  */
////

verify.codeFix({
  description: ts.Diagnostics.Convert_typedef_to_TypeScript_type.message,
  index: 0,
  newFileContent: `
interface Foo {
    bar: number;
}
`,
});