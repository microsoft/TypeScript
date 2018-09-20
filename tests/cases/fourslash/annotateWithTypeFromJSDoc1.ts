/// <reference path='fourslash.ts' />

// @Filename: test123.ts
/////** @type {number} */
////var [|x|];

verify.getSuggestionDiagnostics([{
    message: "JSDoc types may be moved to TypeScript types.",
    code: 80004,
}]);

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`/** @type {number} */
var x: number;`,
});
