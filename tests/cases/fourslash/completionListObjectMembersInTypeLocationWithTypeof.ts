/// <reference path="fourslash.ts" />

// @strict: true

// repro from https://github.com/microsoft/TypeScript/issues/54480

//// const languageService = { getCompletions() {} }
//// type A = Parameters<typeof languageService./**/>

verify.completions({
    marker: "",
    includes: [{ name: "getCompletions", text: "(method) getCompletions(): void" }],
});
