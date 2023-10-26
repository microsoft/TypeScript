/// <reference path='fourslash.ts' />

////
//// /**
////  * @typedef {number} FooNum
////  */
////
//// /**
////  * Some text above the typedef
////  *
////  * @typedef {(number|string|undefined)} FooSome
////  */
////
//// /**
////  * @typedef {string} FooString
////  *
////  * @typedef FooPerson
////  * type {object}
////  * @property {string} id - person's ID
////  * @property name {string} // person's name
////  * @property {number|undefined} age - person's age
////  *
////  * @typedef {object} AnotherFooPerson
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
type FooNum = number;

/**
 * Some text above the typedef
 *
 * @typedef {(number|string|undefined)} FooSome
 */

/**
 * @typedef {string} FooString
 *
 * @typedef FooPerson
 * type {object}
 * @property {string} id - person's ID
 * @property name {string} // person's name
 * @property {number|undefined} age - person's age
 *
 * @typedef {object} AnotherFooPerson
 * @property {object} data
 * @property {string} data.name
 * @property {number} data.age
 * @property {object} data.contact
 * @property {string} data.contact.address
 * @property {string} [data.contact.phone]
 */
`,
});

verify.codeFix({
  description: ts.Diagnostics.Convert_typedef_to_TypeScript_type.message,
  index: 1,
  newFileContent: `
/**
 * @typedef {number} FooNum
 */

/**
 * Some text above the typedef
 */
type FooSome = (number | string | undefined);

/**
 * @typedef {string} FooString
 *
 * @typedef FooPerson
 * type {object}
 * @property {string} id - person's ID
 * @property name {string} // person's name
 * @property {number|undefined} age - person's age
 *
 * @typedef {object} AnotherFooPerson
 * @property {object} data
 * @property {string} data.name
 * @property {number} data.age
 * @property {object} data.contact
 * @property {string} data.contact.address
 * @property {string} [data.contact.phone]
 */
`,
});

verify.codeFix({
  description: ts.Diagnostics.Convert_typedef_to_TypeScript_type.message,
  index: 2,
  newFileContent: `
/**
 * @typedef {number} FooNum
 */

/**
 * Some text above the typedef
 *
 * @typedef {(number|string|undefined)} FooSome
 */

type FooString = string;
/**
 * @typedef FooPerson
 * type {object}
 * @property {string} id - person's ID
 * @property name {string} // person's name
 * @property {number|undefined} age - person's age
 *
 * @typedef {object} AnotherFooPerson
 * @property {object} data
 * @property {string} data.name
 * @property {number} data.age
 * @property {object} data.contact
 * @property {string} data.contact.address
 * @property {string} [data.contact.phone]
 */
`,
});

verify.codeFix({
  description: ts.Diagnostics.Convert_typedef_to_TypeScript_type.message,
  index: 3,
  newFileContent: `
/**
 * @typedef {number} FooNum
 */

/**
 * Some text above the typedef
 *
 * @typedef {(number|string|undefined)} FooSome
 */

/**
 * @typedef {string} FooString
 */
interface FooPerson {
    id: string;
    name: string;
    age: number | undefined;
}
/**
 * @typedef {object} AnotherFooPerson
 * @property {object} data
 * @property {string} data.name
 * @property {number} data.age
 * @property {object} data.contact
 * @property {string} data.contact.address
 * @property {string} [data.contact.phone]
 */
`,
});

verify.codeFix({
  description: ts.Diagnostics.Convert_typedef_to_TypeScript_type.message,
  index: 4,
  newFileContent: `
/**
 * @typedef {number} FooNum
 */

/**
 * Some text above the typedef
 *
 * @typedef {(number|string|undefined)} FooSome
 */

/**
 * @typedef {string} FooString
 *
 * @typedef FooPerson
 * type {object}
 * @property {string} id - person's ID
 * @property name {string} // person's name
 * @property {number|undefined} age - person's age
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
`,
});
