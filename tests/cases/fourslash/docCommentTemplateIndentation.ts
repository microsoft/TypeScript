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

goTo.marker("0");
verify.DocCommentTemplate(noIndentEmptyScaffolding, noIndentOffset);

goTo.marker("1");
verify.DocCommentTemplate(oneIndentEmptyScaffolding, oneIndentOffset);

goTo.marker("2");
verify.DocCommentTemplate(twoIndentEmptyScaffolding, twoIndentOffset);
