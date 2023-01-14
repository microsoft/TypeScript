/// <reference path='fourslash.ts' />

////
//// /**
////  * @typedef Foo
////  * type {object}
////  * @property {string} id - person's ID
////  * @property {string} name - person's name
////  * @property {number} age - person's age
////  */
////

verify.codeFix({
  description: ts.Diagnostics.JSDoc_typedef_may_be_converted_to_TypeScript_type.message,
  index: 0,
  newFileContent: `
interface Foo {
    id: string;
    name: string;
    age: number;
}
`,
});