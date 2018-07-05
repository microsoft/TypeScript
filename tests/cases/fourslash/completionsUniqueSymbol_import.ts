/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////declare const Symbol: () => symbol;
////const privateSym = Symbol();
////export const publicSym = Symbol();
////export interface I {
////    [privateSym]: number;
////    [publicSym]: number;
////    n: number;
////}
////export const i: I;

// @Filename: /user.ts
////import { i } from "./a";
////i[|./**/|];

verify.completions({
    marker: "",
    // TODO: GH#25095 Should include `publicSym`
    exact: "n",
    preferences: {
        includeInsertTextCompletions: true,
        includeCompletionsForModuleExports: true,
    },
});
