/// <reference path='fourslash.ts' />
/////** @return {number} */
////function f() {
////    return 12;
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`/** @return {number} */
function f(): number {
    return 12;
}`,
});
