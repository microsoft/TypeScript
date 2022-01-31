/// <reference path='fourslash.ts'/>

// @noLib: true

// @Filename: /abc.ts
////export type Abc = number;

// @Filename: /user.ts
//// import { Abc } from "./abc";
////function f(Abc: Ab/**/) {}

verify.completions({
    marker: "",
    // Should not have an import completion for 'Abc', should use the local one
    exact: completion.typeKeywordsPlus(["Abc"]),
    preferences: {
        includeCompletionsForModuleExports: true,
    },
});
