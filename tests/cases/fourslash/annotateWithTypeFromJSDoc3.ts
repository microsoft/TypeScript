/// <reference path='fourslash.ts' />
/////**
//// * @param {number} x - the first parameter
//// * @param {{ a: string, b: Date }} y - the most complex parameter
//// * @param z - the best parameter
//// * @param alpha - the other best parameter
//// * @param {*} beta - I have no idea how this got here
//// */
////function [|f|]([|x|], [|y|], z: string, [|alpha|], [|beta|]) {
////    x; y; z; alpha; beta;
////}

const [r0, r1, r2, r3, r4] = test.ranges();
verify.getSuggestionDiagnostics([
    {message: "JSDoc types may be moved to TypeScript types.", code: 80004, range: r0},
    {message: "Parameter 'x' implicitly has an 'any' type.", code: 7006, range: r1 },
    {message: "Parameter 'y' implicitly has an 'any' type.", code: 7006, range: r2 },
    {message: "Parameter 'alpha' implicitly has an 'any' type.", code: 7006, range: r3 },
    {message: "Parameter 'beta' implicitly has an 'any' type.", code: 7006, range: r4 }]);

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
// TODO: GH#22358
`/**
 * @param {number} x - the first parameter
 * @param {{ a: string, b: Date }} y - the most complex parameter
 * @param z - the best parameter
 * @param alpha - the other best parameter
 * @param {*} beta - I have no idea how this got here
 */
function f(x: number, y: { a: string; b: Date; }, z: string, alpha, beta: any) {
    x; y; z; alpha; beta;
}`,
});
