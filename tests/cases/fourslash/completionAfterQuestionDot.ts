/// <reference path="fourslash.ts" />
// @strict: true

//// interface User {
////     address?: {
////         city: string;
////         "postal code": string;
////     }
//// };
//// declare const user: User;
//// user.address[|?./**/|]

verify.completions({
    marker: "",
    exact: [
        { name: "city", text: "(property) city: string" },
        { name: "postal code", text: "(property) \"postal code\": string", insertText: "?.[\"postal code\"]", replacementSpan: test.ranges()[0] }
    ],
    preferences: { includeInsertTextCompletions: true },
});
