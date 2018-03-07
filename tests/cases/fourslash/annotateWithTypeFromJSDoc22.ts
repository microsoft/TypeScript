/// <reference path='fourslash.ts' />
// @strict: true
////
/////** @param {Object<string, boolean>} sb
////  * @param {Object<number, string>} ns */
////function f(sb, ns) {
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
   newFileContent:
`
/** @param {Object<string, boolean>} sb
  * @param {Object<number, string>} ns */
function f(sb: { [s: string]: boolean; }, ns: { [n: number]: string; }) {
}`,
});
