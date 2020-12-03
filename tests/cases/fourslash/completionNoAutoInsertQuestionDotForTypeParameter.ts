/// <reference path="fourslash.ts" />
// @strict: true

//// interface Address {
////     city: string = "";
////     "postal code": string = "";
//// }
//// function f<T extends Address>(x: T) {
////     x[|./**/|]
//// }

verify.completions({
    marker: "",
    exact: [
        { name: "city", text: "(property) Address.city: string" },
        { name: "postal code", text: "(property) Address[\"postal code\"]: string", insertText: "[\"postal code\"]", replacementSpan: test.ranges()[0] }
    ],
    preferences: { includeInsertTextCompletions: true },
});
