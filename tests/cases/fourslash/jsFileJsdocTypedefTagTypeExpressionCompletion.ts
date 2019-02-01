/// <reference path="fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsFileJsdocTypedefTagTypeExpressionCompletion_typedef.js

//// /**
////  * @typedef {/*1*/string | /*2*/number} T.NumberLike
////  * @typedef {{/*propertyName*/age: /*3*/number}} T.People
////  * @typedef {string | number} T.O.Q.NumberLike
////  * @type {/*4*/T./*1TypeMember*/NumberLike}
////  */
//// var x;
//// /** @type {/*5*/T./*2TypeMember*/O.Q.NumberLike} */
//// var x1;
//// /** @type {/*6*/T./*3TypeMember*/People} */
//// var x1;
//// /*globalValue*/

const types: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "T", kind: "module" },
];
const values: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "x", kind: "var" },
    { name: "x1", kind: "var" },
];
const typeMembers: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "NumberLike", kind: "type" },
    { name: "People", kind: "type" },
    { name: "O", kind: "module", kindModifiers: "export" },
];
function warnings(entries: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject>): ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> {
    return entries.map(e => ({ ...e, kind: "warning", kindModifiers: undefined }));
}

verify.completions(
    {
        marker: ["1", "2", "3", "4", "5", "6"],
        includes: [
            ...types,
            ...warnings(values),
            ...warnings(typeMembers),
        ],
    },
    {
        marker: "globalValue",
        includes: [
            ...values,
            ...warnings(types),
            ...warnings(typeMembers),
        ],
    },
    {
        marker: [1, 2, 3].map(i => `${i}TypeMember`),
        includes: [
            ...typeMembers,
            ...warnings(types),
            ...warnings(values),
        ],
    },
    {
        marker: "propertyName",
        exact: undefined,
    },
);
