/// <reference path='fourslash.ts' />

////
//// /**
////  * @typedef {number} FooNum
////  */
////
//// /**
////  * Comment above
////  * the typedef
////  *
////  * @typedef {(number|string|undefined)} FooSome
////  */
////
//// /**
////  * @typedef {string} Foo1
////  *
////  * @typedef FooPerson
////  * type {object}
////  * @property {string} id - person's ID
////  * @property name {string} // person's name
////  * @property {number|undefined} age - person's age
////  *
////  * @see another content
////  *
////  * @typedef {object} AnotherFooPerson
////  * @property {object} data
////  * @property {string} data.name
////  * @property {number} data.age
////  * @property {object} data.contact
////  * @property {string} data.contact.address
////  * @property {string} [data.contact.phone]
////  *
////  *
////  * @extends another content
////  */
////

verify.codeFixAll({
  fixId: 'convertTypedefToType',
  fixAllDescription: ts.Diagnostics.Convert_all_typedef_to_TypeScript_types.message,
  newFileContent: `
type FooNum = number;

/**
 * Comment above
 * the typedef
 */
type FooSome = (number | string | undefined);

type Foo1 = string;

interface FooPerson {
    id: string;
    name: string;
    age: number | undefined;
}
/**
 * @see another content
 */
interface AnotherFooPerson {
    data: {
        name: string;
        age: number;
        contact: {
            address: string;
            phone?: string;
        };
    };
}
/**
 * @extends another content
 */
`,
});
