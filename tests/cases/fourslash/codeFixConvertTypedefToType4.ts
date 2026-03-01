/// <reference path='fourslash.ts' />

////
//// /**
////  * @typedef {object} Person
////  * @property {object} data
////  * @property {string} data.name
////  * @property {number} data.age
////  * @property {object} data.contact
////  * @property {string} data.contact.address
////  * @property {string} [data.contact.phone]
////  */
////

verify.codeFix({
  description: ts.Diagnostics.Convert_typedef_to_TypeScript_type.message,
  index: 0,
  newFileContent: `
interface Person {
    data: {
        name: string;
        age: number;
        contact: {
            address: string;
            phone?: string;
        };
    };
}
`,
});
