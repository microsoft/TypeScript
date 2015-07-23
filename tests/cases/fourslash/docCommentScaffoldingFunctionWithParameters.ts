/// <reference path='fourslash.ts' />

// @Filename: emptyFile.ts
/////*0*/
////    /*1*/
////        function foo(x: number, y: string): boolean {}

const noIndentEmptyScaffolding = "/**\n * \n * @param x \n * @param y\n */";
const oneIndentEmptyScaffolding = "/**\n     * \n     * @param x \n     * @param y\n */";
const noIndentOffset = 7;
const oneIndentOffset = noIndentOffset + 4;