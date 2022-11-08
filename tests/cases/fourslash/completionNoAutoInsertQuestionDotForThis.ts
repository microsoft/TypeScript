/// <reference path="fourslash.ts" />
// @strict: true

//// class Address {
////     city: string = "";
////     "postal code": string = "";
////     method() {
////         this[|./**/|]
////     }
//// }

verify.completions({
    marker: "",
    exact: [
        { name: "city", text: "(property) Address.city: string", insertText: undefined },
        { name: "method" },
        { name: "postal code", text: "(property) Address[\"postal code\"]: string", insertText: "[\"postal code\"]", replacementSpan: test.ranges()[0] },
    ],
    preferences: { includeInsertTextCompletions: true },
});
