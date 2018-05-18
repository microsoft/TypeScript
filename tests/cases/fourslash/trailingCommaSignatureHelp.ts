/// <reference path="fourslash.ts" />

////function str(n: number): string;
/////**
//// * Stringifies a number with radix
//// * @param radix The radix
//// */
////function str(n: number, radix: number): string;
////function str(n: number, radix?: number): string { return ""; }

edit.insert("str(1,");
verify.signatureHelp({
    text: "str(n: number, radix: number): string",
    parameterName: "radix",
    parameterDocComment: "The radix",
    docComment: "Stringifies a number with radix",
    tags: [{ name: "param", text: "radix The radix" }],
});
