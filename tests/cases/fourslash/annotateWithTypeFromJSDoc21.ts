/// <reference path='fourslash.ts' />
// @strict: true
/////**
//// * @return {number}
//// */
////function [|f|](x, y) {
////}
////
/////**
//// * @return {number}
//// */
////function g(x, y): number {
////    return 0;
////}
/////**
//// * @param {number} x
//// */
////function h(x: number, y): number {
////    return 0;
////}
////
/////**
//// * @param {number} x
//// * @param {string} y
//// */
////function i(x: number, y: string) {
////}
/////**
//// * @param {number} x
//// * @return {boolean}
//// */
////function j(x: number, y): boolean {
////    return true;
////}

// Only first location triggers a suggestion
verify.getSuggestionDiagnostics([{
    message: "JSDoc types may be moved to TypeScript types.",
    code: 80004,
}]);

verify.codeFix({
    description: "Annotate with type from JSDoc",
   newFileContent:
`/**
 * @return {number}
 */
function f(x, y): number {
}

/**
 * @return {number}
 */
function g(x, y): number {
    return 0;
}
/**
 * @param {number} x
 */
function h(x: number, y): number {
    return 0;
}

/**
 * @param {number} x
 * @param {string} y
 */
function i(x: number, y: string) {
}
/**
 * @param {number} x
 * @return {boolean}
 */
function j(x: number, y): boolean {
    return true;
}`,
});
