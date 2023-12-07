/// <reference path="fourslash.ts" />

// @strict: true

// repro from https://github.com/microsoft/TypeScript/issues/54480

//// const languageService = { getCompletions() {} }
//// type A = Parameters<typeof languageService./*1*/>
//// 
//// declare const obj: { dance: () => {} } | undefined
//// type B = Parameters<typeof obj./*2*/>

verify.completions({
    marker: "1",
    includes: [{ name: "getCompletions", text: "(method) getCompletions(): void" }],
});
verify.completions({
    marker: "2",
    includes: [{ name: "dance", text: "(property) dance: () => {}" }],
});
