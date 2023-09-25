/// <reference path='fourslash.ts' />

/////*a*/
////var a = x => x
////
/////*b*/
////let b = (x,y,z) => x + y + z;
////
/////*c*/
////const c = ((x => +x))
////
/////*d*/
////let d = (function () { })
////
/////*e*/
////let e = function e([a,b,c]) {
////    return "hello"
////};
////
/////*f*/
////let f = class {
////}
////
/////*g*/
////const g = ((class G {
////    constructor(private x);
////    constructor(x,y,z);
////    constructor(x,y,z, ...okayThatsEnough) {
////    }
////}))

verify.docCommentTemplateAt("a", /*newTextOffset*/ 7,
`/**
 * 
 * @param x
 * @returns
 */`);

verify.docCommentTemplateAt("b", /*newTextOffset*/ 7,
`/**
 * 
 * @param x
 * @param y
 * @param z
 * @returns
 */`);

verify.docCommentTemplateAt("c", /*newTextOffset*/ 7,
`/**
 * 
 * @param x
 * @returns
 */`);

verify.docCommentTemplateAt("d", /*newTextOffset*/ 3,
"/** */");

verify.docCommentTemplateAt("e", /*newTextOffset*/ 7,
`/**
 * 
 * @param param0
 * @returns
 */`);

verify.docCommentTemplateAt("f", /*newTextOffset*/ 3,
"/** */");

verify.docCommentTemplateAt("g", /*newTextOffset*/ 7,
`/**
 * 
 * @param x
 */`);
