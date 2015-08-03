/// <reference path='fourslash.ts' />

// @Filename: functionWithParams.ts
/////*0*/
////    /*1*/
////        function foo(x: number, y: string): boolean {}

const noIndentScaffolding = "/**\n * \n * @param x\n * @param y\n */";
const oneIndentScaffolding = "/**\n     * \n     * @param x\n     * @param y\n     */";
const noIndentOffset = 7;
const oneIndentOffset = noIndentOffset + 4;

goTo.marker("0");
verify.DocCommentTemplate(noIndentScaffolding, noIndentOffset);

goTo.marker("1");
verify.DocCommentTemplate(oneIndentScaffolding, oneIndentOffset);