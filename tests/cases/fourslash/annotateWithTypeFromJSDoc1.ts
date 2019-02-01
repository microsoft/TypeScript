/// <reference path='fourslash.ts' />

// @Filename: test123.ts
/////** @type {number} */
////var [|x|];

verify.getSuggestionDiagnostics([
    { message: "JSDoc types may be moved to TypeScript types.", code: 80004 },
    { message: "Variable 'x' implicitly has an 'any' type, but a better type may be inferred from usage.", code: 7043 }]);

verify.codeFix({
    description: "Annotate with type from JSDoc",
    index: 0,
    newFileContent:
`/** @type {number} */
var x: number;`,
});
