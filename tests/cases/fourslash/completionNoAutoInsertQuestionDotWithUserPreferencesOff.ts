/// <reference path="fourslash.ts" />
// @strict: true

//// interface User {
////     address?: {
////         city: string;
////         "postal code": string;
////     }
//// };
//// declare const user: User;
//// user.address[|./**/|]

verify.completions({
    marker: "",
    exact: [],
    preferences: {
        includeInsertTextCompletions: true,
        includeAutomaticOptionalChainCompletions: false
    },
});
