/// <reference path='fourslash.ts' />
// @strict: true
////
/////** @param {Object<string, boolean>} sb
////  * @param {Object<number, string>} ns */
////function f(sb, ns) {
////    sb; ns;
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
   newFileContent:
`
/** @param {Object<string, boolean>} sb
  * @param {Object<number, string>} ns */
function f(sb: { [x: string]: boolean; }, ns: { [x: number]: string; }) {
    sb; ns;
}`,
});
