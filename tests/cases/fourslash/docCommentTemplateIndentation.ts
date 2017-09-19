/// <reference path='fourslash.ts' />

// @Filename: indents.ts
////    a   /*2*/
////    /*1*/
/////*0*/        function foo() { }

const noIndentEmptyScaffolding = "/**\r\n * \r\n */";
const oneIndentEmptyScaffolding = "/**\r\n     * \r\n     */";
const twoIndentEmptyScaffolding = "/**\r\n         * \r\n         */";
const noIndentOffset = 8;
const oneIndentOffset = noIndentOffset + 4;
const twoIndentOffset = oneIndentOffset + 4;

verify.docCommentTemplateAt("0", noIndentOffset, noIndentEmptyScaffolding);
verify.docCommentTemplateAt("1", oneIndentOffset, oneIndentEmptyScaffolding);
verify.docCommentTemplateAt("2", twoIndentOffset, twoIndentEmptyScaffolding);
