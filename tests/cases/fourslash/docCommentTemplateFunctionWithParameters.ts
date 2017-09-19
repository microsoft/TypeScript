/// <reference path='fourslash.ts' />

// @Filename: functionWithParams.ts
/////*0*/
////    /*1*/
////        function foo(x: number, y: string): boolean {}

const noIndentScaffolding = "/**\r\n * \r\n * @param x\r\n * @param y\r\n */";
const oneIndentScaffolding = "/**\r\n     * \r\n     * @param x\r\n     * @param y\r\n     */";
const noIndentOffset = 8;
const oneIndentOffset = noIndentOffset + 4;

goTo.marker("0");
verify.docCommentTemplateAt("0", noIndentOffset, noIndentScaffolding);
verify.docCommentTemplateAt("1", oneIndentOffset, oneIndentScaffolding);
