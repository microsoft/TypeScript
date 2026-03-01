/// <reference path='fourslash.ts' />

////
//// /**
////  * @typedef Foo
////  * type {object}
////  * @property {string} id - person's ID
////  * @property name {string} // person's name
////  * @property {number|undefined} age - person's age
////  */
////

verify.codeFix({
  description: ts.Diagnostics.Convert_typedef_to_TypeScript_type.message,
  index: 0,
  newFileContent: `
interface Foo {
    id: string;
    name: string;
    age: number | undefined;
}
`,
});