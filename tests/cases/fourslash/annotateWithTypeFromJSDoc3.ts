/// <reference path='fourslash.ts' />
/////**
//// * @param {number} x - the first parameter
//// * @param {{ a: string, b: Date }} y - the most complex parameter
//// * @param z - the best parameter
//// * @param alpha - the other best parameter
//// * @param {*} beta - I have no idea how this got here
//// */
////function [|f|](x, y, z: string, alpha, beta) {
////}

verify.getSuggestionDiagnostics([{
    message: "JSDoc types may be moved to TypeScript types.",
    code: 80004,
}]);

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`/**
 * @param {number} x - the first parameter
 * @param {{ a: string, b: Date }} y - the most complex parameter
 * @param z - the best parameter
 * @param alpha - the other best parameter
 * @param {*} beta - I have no idea how this got here
 */
function f(x: number, y: { a: string; b: Date; }, z: string, alpha, beta: any) {
}`,
});
