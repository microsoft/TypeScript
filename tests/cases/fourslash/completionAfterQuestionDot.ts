/// <reference path="fourslash.ts" />
// @strict: true

//// class User {
////     #foo: User;
////     bar: User;
////     address?: {
////         city: string;
////         "postal code": string;
////     };
////     constructor() {
////         this.address[|?./*1*/|];
////         this[|?./*2*/|];
////         this?.bar[|?./*3*/|];
////     }
//// };

verify.completions({
    marker: "1",
    exact: [
        { name: "city", text: "(property) city: string" },
        { name: "postal code", text: "(property) \"postal code\": string", insertText: "?.[\"postal code\"]", replacementSpan: test.ranges()[0] }
    ],
    preferences: { includeInsertTextCompletions: true },
});

verify.completions({
    marker: "2",
    exact: [
        { name: "address" },
        { name: "bar" },
    ],
    preferences: { includeInsertTextCompletions: true },
});

verify.completions({
    marker: "3",
    exact: [
        { name: "address" },
        { name: "bar" },
    ],
    preferences: { includeInsertTextCompletions: true },
});
